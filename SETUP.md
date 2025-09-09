# StudyAgent Setup Guide

This guide will help you set up both the frontend (Next.js) and backend (FastAPI) to work together.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (if not already done)
pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with your API keys:

```env
# Required API Keys for the backend
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Backend URL for frontend (optional, defaults to localhost:8000)
BACKEND_URL=http://localhost:8000
```

### 3. Start Both Servers

You have two options:

#### Option A: Start Both Servers Separately

```bash
# Terminal 1: Start the FastAPI backend
python main.py

# Terminal 2: Start the Next.js frontend
npm run dev
```

#### Option B: Start Both Servers Together

```bash
# Install concurrently if not already installed
npm install -g concurrently

# Start both servers with one command
npm run dev:full
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Backend Docs**: http://localhost:8000/docs

## 🔧 Configuration

### Backend Configuration

The backend is already configured to:
- Load PDFs from the `pdfs/` folder
- Use multiple LLM providers (OpenAI, Groq, Google)
- Provide authentication endpoints
- Handle file uploads

### Frontend Configuration

The frontend is configured to:
- Connect to the backend API at `http://localhost:8000`
- Display real-time chat responses
- Show loading states during API calls
- Handle errors gracefully

## 📁 Project Structure

```
studyagent/
├── app/                    # Next.js frontend
│   ├── api/               # API routes
│   │   └── chat/          # Chat API endpoint
│   ├── components/        # React components
│   ├── globals.css        # Global styles
│   └── page.tsx          # Main page
├── pdfs/                  # PDF documents for RAG
├── main.py               # FastAPI backend
├── requirements.txt      # Python dependencies
├── package.json          # Node.js dependencies
└── README.md            # Project documentation
```

## 🐛 Troubleshooting

### Common Issues

1. **"Backend server is not running" error**
   - Make sure the FastAPI server is running on port 8000
   - Check if the backend URL is correct in your environment

2. **CORS errors**
   - The backend should handle CORS automatically
   - If you see CORS errors, check the FastAPI CORS configuration

3. **API key errors**
   - Make sure all required API keys are set in your `.env` file
   - Check that the keys are valid and have sufficient credits

4. **PDF processing errors**
   - Ensure PDFs are in the `pdfs/` folder
   - Check that PDFs are not corrupted or password-protected

### Debug Mode

To run in debug mode:

```bash
# Backend with debug logging
python main.py --log-level debug

# Frontend with debug mode
npm run dev -- --debug
```

## 🔄 How It Works

1. **User sends a message** in the chat interface
2. **Frontend sends the message** to `/api/chat` endpoint
3. **Next.js API route** forwards the message to the FastAPI backend
4. **Backend processes the message** using RAG (Retrieval Augmented Generation)
5. **Backend returns the AI response** with source citations
6. **Frontend displays the response** in the chat interface

## 📝 API Endpoints

### Frontend API Routes
- `POST /api/chat` - Send message to backend

### Backend API Endpoints
- `POST /ask` - Ask questions to the RAG system
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /status` - System status
- `POST /upload-pdf` - Upload PDF documents (admin only)

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Railway/Heroku)
1. Create a new project
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

## 📞 Support

If you encounter any issues:
1. Check the console logs for errors
2. Verify all environment variables are set
3. Ensure both servers are running
4. Check the backend API documentation at http://localhost:8000/docs

## 🎯 Next Steps

1. Add more PDF documents to the `pdfs/` folder
2. Customize the UI components
3. Add user authentication to the frontend
4. Implement file upload functionality
5. Add more AI features and integrations
