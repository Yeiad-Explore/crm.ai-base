from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, Header
from pydantic import BaseModel
from typing import Optional, Literal, List
import os
import PyPDF2
import shutil
from dotenv import load_dotenv
from contextlib import asynccontextmanager

# Load environment variables from .env file
load_dotenv()
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.output_parsers import StrOutputParser
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_google_genai import ChatGoogleGenerativeAI
from sentence_transformers import CrossEncoder
import logging
from datetime import datetime
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Set API keys - use environment variables for security
# Make sure to set these environment variables before running the application
openai_key = os.getenv("OPENAI_API_KEY")
groq_key = os.getenv("GROQ_API_KEY")
google_key = os.getenv("GOOGLE_API_KEY")

# Only set environment variables if they exist
if openai_key:
    os.environ["OPENAI_API_KEY"] = openai_key
if groq_key:
    os.environ["GROQ_API_KEY"] = groq_key
if google_key:
    os.environ["GOOGLE_API_KEY"] = google_key

# Validate that required API keys are set
required_keys = ["OPENAI_API_KEY", "GROQ_API_KEY", "GOOGLE_API_KEY"]
missing_keys = [key for key in required_keys if not os.getenv(key)]
if missing_keys:
    logger.warning(f"Missing API keys: {missing_keys}. Some LLM providers may not work.")
    logger.warning("Please create a .env file with your API keys. See env.example for reference.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize RAG system on startup"""
    
    # Load users from file if exists
    load_users_from_file()
    logger.info(f"System started with {len(USERS)} users")
    
    try:
        pdf_folder = "pdfs"  
        
        if not os.path.exists(pdf_folder):
            os.makedirs(pdf_folder)
            logger.info(f"Created {pdf_folder} folder. Please add your PDF files there.")
            yield
            return
            
        num_pdfs, num_chunks = initialize_rag_system(pdf_folder)
        logger.info(f"RAG system initialized with {num_pdfs} PDFs and {num_chunks} chunks")
        
    except Exception as e:
        logger.error(f"Error initializing RAG system: {e}")
    
    yield  # This is where the app runs
    
    # Save users before shutdown
    save_users_to_file()
    logger.info("Shutting down RAG system")

app = FastAPI(
    title="PDF RAG API", 
    description="RAG system for PDF documents with multiple LLM support and reranking",
    lifespan=lifespan
)

# Pydantic models
class QuestionRequest(BaseModel):
    question: str
    llm_provider: Literal["openai", "groq", "gemini"] = "openai"
    model_name: Optional[str] = None
    use_reranker: bool = True
    max_chunks: int = 10

class QuestionResponse(BaseModel):
    answer: str
    status: str
    llm_used: str
    chunks_used: int
    reranker_used: bool

class LLMConfigRequest(BaseModel):
    llm_provider: Literal["openai", "groq", "gemini"]
    model_name: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    user_role: str
    message: str

class RegistrationRequest(BaseModel):
    username: str
    password: str
    confirm_password: str
    email: Optional[str] = None
    full_name: Optional[str] = None

class RegistrationResponse(BaseModel):
    message: str
    username: str
    role: str
    status: str

# Global variables to store the RAG components
vector_store = None
retriever = None
reranker = None
current_llm_config = {"provider": "openai", "model": "gpt-4o-mini"}

# Simple user store (replace with proper database in production)
USERS = {
    "admin": {"password": "admin123", "role": "admin"},
    "user": {"password": "user123", "role": "user"},
    "demo": {"password": "demo123", "role": "user"}
}

# Admin tokens (replace with proper JWT in production)
ADMIN_TOKENS = {"admin_secret_token_2024"}
USER_TOKENS = {"user_token_2024", "demo_token_2024"}

def verify_admin_token(authorization: str = Header(None)):
    """Verify that the user has admin privileges"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, 
            detail="Authorization header required. Format: 'Bearer <token>'"
        )
    
    token = authorization.split(" ")[1]
    
    if token not in ADMIN_TOKENS:
        raise HTTPException(
            status_code=403, 
            detail="Admin access required. Only administrators can upload PDFs."
        )
    
    return {"role": "admin", "token": token}

def verify_any_token(authorization: str = Header(None)):
    """Verify any valid user token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, 
            detail="Authorization header required"
        )
    
    token = authorization.split(" ")[1]
    
    if token in ADMIN_TOKENS:
        return {"role": "admin", "token": token}
    elif token in USER_TOKENS:
        return {"role": "user", "token": token}
    else:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_llm(provider: str, model_name: Optional[str] = None):
    """Get the appropriate LLM based on provider and model"""
    
    if provider == "openai":
        model = model_name or "gpt-4o-mini"
        return ChatOpenAI(model=model, temperature=0.2), f"OpenAI ({model})"
    
    elif provider == "groq":
        model = model_name or "deepseek-r1-distill-llama-70b"
        return ChatGroq(model=model, temperature=0.2), f"Groq ({model})"
    
    elif provider == "gemini":
        model = model_name or "gemini-1.5-flash"
        return ChatGoogleGenerativeAI(model=model, temperature=0.2), f"Gemini ({model})"
    
    else:
        raise ValueError(f"Unsupported LLM provider: {provider}")

def extract_text_from_pdf(pdf_path):
    """Extract text from a single PDF file with better error handling"""
    try:
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                extracted = page.extract_text()
                if extracted:
                    text += extracted + " "
        
        if not text.strip():
            logger.warning(f"No text extracted from {pdf_path}")
            return ""
            
        return text.strip()
    except Exception as e:
        logger.error(f"Error extracting text from {pdf_path}: {e}")
        return ""

def initialize_rag_system(pdf_folder_path: str):
    """Initialize the RAG system with PDFs from a folder and load reranker"""
    global vector_store, retriever, reranker
    
    # Initialize reranker
    try:
        logger.info("Loading reranker model...")
        reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
        logger.info("Reranker loaded successfully")
    except Exception as e:
        logger.error(f"Failed to load reranker: {e}")
        reranker = None
    
    # Get all PDF files
    pdf_files = []
    for filename in os.listdir(pdf_folder_path):
        if filename.lower().endswith('.pdf'):
            pdf_files.append(os.path.join(pdf_folder_path, filename))
    
    if not pdf_files:
        logger.warning("No PDF files found in the specified folder")
        raise Exception("No PDF files found in the specified folder")
    
    # Extract text from all PDFs with metadata
    documents = []
    for pdf_path in pdf_files:
        logger.info(f"Processing {pdf_path}")
        pdf_text = extract_text_from_pdf(pdf_path)
        if pdf_text:
            # Create chunks with metadata
            splitter = RecursiveCharacterTextSplitter(
                chunk_size=800, 
                chunk_overlap=100,
                length_function=len,
                separators=["\n\n", "\n", ". ", " ", ""]
            )
            chunks = splitter.create_documents(
                [pdf_text], 
                metadatas=[{"source": os.path.basename(pdf_path)}]
            )
            documents.extend(chunks)
    
    if not documents:
        raise Exception("No text could be extracted from PDF files")
    
    # Create embeddings and vector store
    logger.info("Creating embeddings and vector store...")
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'},
        encode_kwargs={'normalize_embeddings': True}
    )
    vector_store = FAISS.from_documents(documents, embeddings)
    
    # Set up retriever with increased initial results for reranking
    retriever = vector_store.as_retriever(
        search_type="similarity", 
        search_kwargs={"k": 20}  # Get more initial results for reranking
    )
    
    logger.info(f"RAG system initialized with {len(pdf_files)} PDFs and {len(documents)} chunks")
    return len(pdf_files), len(documents)

def rerank_documents(query: str, documents: List, top_k: int = 10):
    """Rerank documents using cross-encoder"""
    if not reranker or not documents:
        return documents[:top_k]
    
    try:
        # Prepare query-document pairs
        query_doc_pairs = [(query, doc.page_content) for doc in documents]
        
        # Get reranking scores
        scores = reranker.predict(query_doc_pairs)
        
        # Sort documents by score
        doc_score_pairs = list(zip(documents, scores))
        doc_score_pairs.sort(key=lambda x: x[1], reverse=True)
        
        # Return top-k reranked documents
        reranked_docs = [doc for doc, score in doc_score_pairs[:top_k]]
        
        logger.info(f"Reranked {len(documents)} documents, returning top {len(reranked_docs)}")
        return reranked_docs
        
    except Exception as e:
        logger.error(f"Error in reranking: {e}")
        return documents[:top_k]

def create_rag_chain(llm_provider: str, model_name: Optional[str] = None, use_reranker: bool = True, max_chunks: int = 10):
    """Create RAG chain with specified LLM and reranking"""
    if retriever is None:
        raise Exception("RAG system not initialized")
    
    # Get LLM
    llm, llm_description = get_llm(llm_provider, model_name)
    
    # Enhanced prompt with source citations
    prompt = PromptTemplate(
        template="""
You are a helpful AI assistant for a company. Answer questions based ONLY on the provided document context.

Guidelines:
- Answer ONLY from the provided context
- If context is insufficient, say "I don't have enough information to answer this question"
- Be polite and professional as you're assisting fellow employees
- Write in Bangla if user writes in Bangla, otherwise use English
- Provide detailed, descriptive answers with bullet points when appropriate
- Include source references when mentioning specific information
- Guide users on where they can find more detailed information

Context from documents:
{context}

Question: {question}

Answer:""",
        input_variables=['context', 'question']
    )
    
    def enhanced_retrieval(question):
        """Enhanced retrieval with reranking"""
        # Get initial documents
        initial_docs = retriever.invoke(question)
        
        # Apply reranking if enabled
        if use_reranker and reranker:
            final_docs = rerank_documents(question, initial_docs, max_chunks)
        else:
            final_docs = initial_docs[:max_chunks]
        
        return final_docs
    
    def format_docs(retrieved_docs):
        """Format documents with source information"""
        if not retrieved_docs:
            return "No relevant documents found."
        
        formatted_chunks = []
        for i, doc in enumerate(retrieved_docs, 1):
            source = doc.metadata.get('source', 'Unknown')
            content = doc.page_content.strip()
            formatted_chunks.append(f"[Source {i}: {source}]\n{content}")
        
        return "\n\n".join(formatted_chunks)

    # Create the enhanced chain
    parallel_chain = RunnableParallel({
        'context': RunnableLambda(enhanced_retrieval) | RunnableLambda(format_docs),
        'question': RunnablePassthrough()
    })
    
    parser = StrOutputParser()
    chain = parallel_chain | prompt | llm | parser
    
    return chain, llm_description

# Helper functions for user management
def username_exists(username: str) -> bool:
    """Check if username already exists"""
    return username.lower() in [u.lower() for u in USERS.keys()]

def save_users_to_file():
    """Save users to a JSON file for basic persistence"""
    try:
        users_file = "users_data.json"
        # Filter out sensitive data if needed
        users_data = {}
        for username, user_info in USERS.items():
            users_data[username] = {
                "password": user_info["password"],
                "role": user_info["role"],
                "email": user_info.get("email"),
                "full_name": user_info.get("full_name"),
                "created_at": user_info.get("created_at")
            }
        
        with open(users_file, 'w') as f:
            json.dump(users_data, f, indent=2)
        
        logger.info(f"Users data saved to {users_file}")
    except Exception as e:
        logger.error(f"Error saving users data: {e}")

def load_users_from_file():
    """Load users from JSON file on startup"""
    global USERS
    try:
        users_file = "users_data.json"
        if os.path.exists(users_file):
            with open(users_file, 'r') as f:
                loaded_users = json.load(f)
                
            # Merge with existing hardcoded users
            for username, user_info in loaded_users.items():
                if username not in USERS:  # Don't override hardcoded admin accounts
                    USERS[username] = user_info
                    # Regenerate tokens for loaded users
                    if user_info.get("role") == "user":
                        USER_TOKENS.add(f"{username}_token_2024")
            
            logger.info(f"Loaded {len(loaded_users)} users from {users_file}")
    except Exception as e:
        logger.error(f"Error loading users data: {e}")

# Authentication endpoints
@app.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """User login endpoint"""
    username = request.username
    password = request.password
    
    if username not in USERS or USERS[username]["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    user_role = USERS[username]["role"]
    
    # Generate token based on role
    if user_role == "admin":
        token = "admin_secret_token_2024"
    else:
        token = f"{username}_token_2024"
        USER_TOKENS.add(token)
    
    return LoginResponse(
        access_token=token,
        user_role=user_role,
        message=f"{user_role.title()} login successful"
    )

@app.post("/auth/register", response_model=RegistrationResponse)
async def register(request: RegistrationRequest):
    """User registration endpoint"""
    username = request.username.strip()
    password = request.password
    confirm_password = request.confirm_password
    
    # Validation
    if not username or not password or not confirm_password:
        raise HTTPException(
            status_code=400, 
            detail="Username, password, and confirm password are required"
        )
    
    # Check username length
    if len(username) < 3 or len(username) > 20:
        raise HTTPException(
            status_code=400, 
            detail="Username must be between 3 and 20 characters"
        )
    
    # Check password strength (basic check)
    if len(password) < 6:
        raise HTTPException(
            status_code=400, 
            detail="Password must be at least 6 characters long"
        )
    
    # Check password confirmation
    if password != confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Password and confirm password do not match"
        )
    
    # Check if username already exists (case-insensitive)
    if username_exists(username):
        raise HTTPException(
            status_code=409, 
            detail="Username already exists. Please choose a different username."
        )
    
    # Check for invalid characters in username
    if not username.replace("_", "").replace("-", "").isalnum():
        raise HTTPException(
            status_code=400,
            detail="Username can only contain letters, numbers, underscores, and hyphens"
        )
    
    # Register new user with 'user' role by default
    # Admin accounts should be created manually for security
    new_user = {
        "password": password,  # Keeping plain text to match existing system
        "role": "user",
        "email": request.email,
        "full_name": request.full_name,
        "created_at": datetime.now().isoformat()
    }
    
    # Add to USERS dictionary
    USERS[username] = new_user
    
    # Generate a user token for this new user
    user_token = f"{username}_token_2024"
    USER_TOKENS.add(user_token)
    
    # Log the registration
    logger.info(f"New user registered: {username} with role: user")
    
    # Optional: Save to a file for persistence between restarts
    # This is a simple solution that maintains compatibility
    try:
        save_users_to_file()
    except Exception as e:
        logger.warning(f"Could not persist user data: {e}")
    
    return RegistrationResponse(
        message="Registration successful! You can now login with your credentials.",
        username=username,
        role="user",
        status="success"
    )

@app.get("/auth/check-username/{username}")
async def check_username(username: str):
    """Check if username is available for registration"""
    if len(username) < 3:
        return {
            "available": False,
            "message": "Username too short (minimum 3 characters)"
        }
    
    if len(username) > 20:
        return {
            "available": False,
            "message": "Username too long (maximum 20 characters)"
        }
    
    if not username.replace("_", "").replace("-", "").isalnum():
        return {
            "available": False,
            "message": "Username can only contain letters, numbers, underscores, and hyphens"
        }
    
    if username_exists(username):
        return {
            "available": False,
            "message": "Username already taken"
        }
    
    return {
        "available": True,
        "message": "Username is available"
    }

@app.get("/auth/me")
async def get_current_user(current_user: dict = Depends(verify_any_token)):
    """Get current user information"""
    return {
        "role": current_user["role"],
        "authenticated": True,
        "token_valid": True
    }

# System endpoints
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "PDF RAG API with authentication and reranking is running", 
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/status")
async def get_status():
    """Get system status"""
    if retriever is None:
        return {"status": "not_initialized", "message": "RAG system not initialized"}
    
    return {
        "status": "ready", 
        "message": "RAG system ready to answer questions",
        "current_llm": current_llm_config,
        "reranker_available": reranker is not None,
        "vector_store_ready": vector_store is not None
    }

@app.get("/llm-options")
async def get_llm_options():
    """Get available LLM options"""
    return {
        "providers": {
            "openai": {
                "models": ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
                "default": "gpt-4o-mini"
            },
            "groq": {
                "models": ["deepseek-r1-distill-llama-70b", "llama-3.1-70b-versatile", "mixtral-8x7b-32768"],
                "default": "deepseek-r1-distill-llama-70b"
            },
            "gemini": {
                "models": ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash"],
                "default": "gemini-1.5-flash"
            }
        }
    }

@app.post("/configure-llm")
async def configure_llm(config: LLMConfigRequest, current_user: dict = Depends(verify_admin_token)):
    """Configure default LLM settings (Admin only)"""
    global current_llm_config
    
    try:
        # Test the LLM configuration
        _, llm_description = get_llm(config.llm_provider, config.model_name)
        
        current_llm_config = {
            "provider": config.llm_provider,
            "model": config.model_name or {
                "openai": "gpt-4o-mini",
                "groq": "deepseek-r1-distill-llama-70b",
                "gemini": "gemini-1.5-flash"
            }[config.llm_provider]
        }
        
        logger.info(f"LLM configuration updated by admin: {llm_description}")
        
        return {
            "status": "success",
            "message": f"LLM configured to {llm_description}",
            "config": current_llm_config
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error configuring LLM: {str(e)}")

# Document management endpoints
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...), current_user: dict = Depends(verify_admin_token)):
    """Upload a PDF file to the pdfs folder and reinitialize RAG system (Admin only)"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Check file size (50MB limit)
    if file.size and file.size > 50 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size too large. Maximum 50MB allowed.")
    
    file_path = None
    try:
        # Ensure pdfs folder exists
        pdf_folder = "pdfs"
        if not os.path.exists(pdf_folder):
            os.makedirs(pdf_folder)
        
        # Save the uploaded file with timestamp to avoid conflicts
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_filename = f"{timestamp}_{file.filename}"
        file_path = os.path.join(pdf_folder, safe_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"PDF uploaded by admin: {safe_filename}")
        
        # Reinitialize RAG system with all PDFs
        global vector_store, retriever
        num_pdfs, num_chunks = initialize_rag_system(pdf_folder)
        
        return {
            "status": "success",
            "message": f"PDF uploaded successfully and RAG system updated",
            "filename": safe_filename,
            "original_filename": file.filename,
            "total_pdfs": num_pdfs,
            "total_chunks": num_chunks
        }
        
    except Exception as e:
        # Clean up the file if there was an error
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
        logger.error(f"Error uploading PDF: {e}")
        raise HTTPException(status_code=500, detail=f"Error uploading PDF: {str(e)}")

@app.get("/documents")
async def list_documents(current_user: dict = Depends(verify_any_token)):
    """List all PDF documents in the system"""
    try:
        pdf_folder = "pdfs"
        if not os.path.exists(pdf_folder):
            return {"documents": [], "total": 0}
        
        documents = []
        for filename in os.listdir(pdf_folder):
            if filename.lower().endswith('.pdf'):
                file_path = os.path.join(pdf_folder, filename)
                stat = os.stat(file_path)
                documents.append({
                    "filename": filename,
                    "size_mb": round(stat.st_size / (1024 * 1024), 2),
                    "uploaded_date": datetime.fromtimestamp(stat.st_ctime).isoformat()
                })
        
        documents.sort(key=lambda x: x["uploaded_date"], reverse=True)
        
        return {
            "documents": documents,
            "total": len(documents)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing documents: {str(e)}")

# Chat endpoint
@app.post("/ask", response_model=QuestionResponse)
async def ask_question(request: QuestionRequest):
    """Ask a question to the RAG system with enhanced retrieval and reranking (Open access)"""
    if retriever is None:
        raise HTTPException(status_code=503, detail="RAG system not initialized. Please contact administrator.")
    
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    try:
        # Use specified LLM or fall back to current config
        llm_provider = request.llm_provider or current_llm_config["provider"]
        model_name = request.model_name or current_llm_config["model"]
        
        # Create RAG chain with enhanced retrieval
        chain, llm_description = create_rag_chain(
            llm_provider, 
            model_name, 
            request.use_reranker, 
            request.max_chunks
        )
        
        # Get answer from RAG system
        logger.info(f"Processing question with {llm_description}, reranker: {request.use_reranker}")
        answer = chain.invoke(request.question)
        
        return QuestionResponse(
            answer=answer,
            status="success",
            llm_used=llm_description,
            chunks_used=min(request.max_chunks, 20),
            reranker_used=request.use_reranker and reranker is not None
        )
        
    except Exception as e:
        logger.error(f"Error processing question: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    