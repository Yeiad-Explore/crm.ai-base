# Python Backend (Alternative)

This directory contains the original Python FastAPI backend with full RAG functionality. This is kept as an alternative deployment option.

## Features

- Full RAG (Retrieval-Augmented Generation) system
- PDF document processing and vector storage
- Multiple LLM provider support (OpenAI, Groq, Google Gemini)
- Document reranking with cross-encoder
- User authentication and management
- PDF upload and management

## Setup

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Set environment variables**:
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

3. **Add PDF documents**:
   Place your PDF files in the `pdfs/` directory

4. **Run the server**:
   ```bash
   python main.py
   ```

## Deployment Options

- **Railway**: Easy deployment with automatic Python detection
- **Render**: Free tier available with automatic deployments
- **AWS Lambda**: Using Mangum adapter
- **Google Cloud Run**: Containerized deployment
- **Heroku**: Traditional hosting platform

## API Endpoints

- `GET /` - Health check
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /ask` - Ask questions to RAG system
- `POST /upload-pdf` - Upload PDF documents (admin only)
- `GET /documents` - List uploaded documents
- `GET /status` - System status

## Integration with Frontend

To use this backend with the Next.js frontend:

1. Deploy this Python backend to a hosting service
2. Update the API calls in the frontend to point to your backend URL
3. Remove or disable the Next.js API routes in `/app/api/`

Example frontend configuration:
```typescript
const API_BASE_URL = 'https://your-backend-url.com';
```
