# Project Structure Overview

This project has been restructured for optimal deployment on Vercel or Netlify while maintaining both frontend and backend functionality.

## Current Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # Serverless API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   ├── check-username/[username]/route.ts
│   │   │   └── me/route.ts
│   │   ├── ask/route.ts          # Main chat endpoint
│   │   ├── status/route.ts       # System status
│   │   └── llm-options/route.ts  # Available LLM options
│   ├── components/               # React components
│   ├── chat/page.tsx            # Chat interface
│   ├── demo/page.tsx            # Demo page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Shared components
├── lib/                         # Utility functions
├── public/                      # Static assets
├── backend-python/              # Original Python backend (alternative)
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── users_data.json          # User data
│   ├── pdfs/                    # PDF documents
│   └── README.md                # Backend documentation
├── vercel.json                  # Vercel configuration
├── netlify.toml                 # Netlify configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Node.js dependencies
├── env.example                  # Environment variables template
├── DEPLOYMENT.md                # Deployment guide
└── PROJECT_STRUCTURE.md         # This file
```

## Deployment Options

### Option 1: Vercel (Recommended)
- **Frontend**: Next.js app with API routes
- **Backend**: Serverless functions (simplified)
- **Database**: JSON file storage
- **AI**: OpenAI API integration

### Option 2: Netlify
- **Frontend**: Next.js app with API routes
- **Backend**: Serverless functions
- **Database**: JSON file storage
- **AI**: OpenAI API integration

### Option 3: Hybrid Deployment
- **Frontend**: Deploy to Vercel/Netlify
- **Backend**: Deploy Python backend separately
- **Database**: External database service
- **AI**: Full RAG system with vector storage

## Key Changes Made

1. **Converted Python FastAPI to Next.js API routes**
   - Authentication system
   - Chat functionality
   - User management

2. **Simplified AI integration**
   - Direct OpenAI API calls
   - Removed complex ML dependencies
   - Serverless-compatible

3. **Organized file structure**
   - Moved Python backend to separate directory
   - Clean Next.js structure
   - Proper configuration files

4. **Added deployment configurations**
   - Vercel configuration
   - Netlify configuration
   - Environment variable templates

## Next Steps

1. **Choose deployment option** based on your needs
2. **Set up environment variables** with your API keys
3. **Deploy to your chosen platform**
4. **Test the application** thoroughly

## Migration Notes

- The original Python backend is preserved in `backend-python/`
- You can still use the full RAG functionality by deploying the Python backend separately
- The frontend can be easily configured to use either backend
- All user data and PDFs are preserved in the backend-python directory
