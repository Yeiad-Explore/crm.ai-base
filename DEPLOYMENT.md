# Deployment Guide

This project is now structured for deployment on Vercel or Netlify. The Python FastAPI backend has been converted to Next.js API routes for better compatibility with serverless platforms.

## Project Structure

```
├── app/
│   ├── api/                    # Next.js API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── ask/               # Main chat endpoint
│   │   ├── status/            # System status
│   │   └── llm-options/       # Available LLM options
│   ├── components/            # React components
│   ├── chat/                  # Chat page
│   ├── demo/                  # Demo page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/                 # Shared components
├── lib/                       # Utility functions
├── public/                    # Static assets
├── vercel.json               # Vercel configuration
├── netlify.toml              # Netlify configuration
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
└── env.example               # Environment variables template
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the following environment variables:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `GROQ_API_KEY`: Your Groq API key (optional)
     - `GOOGLE_API_KEY`: Your Google API key (optional)

4. **Redeploy** after setting environment variables.

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Set Environment Variables**:
   - Go to Site settings > Environment variables
   - Add the same environment variables as above

### Option 3: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   npm run start
   ```

2. **Deploy to any Node.js hosting service** that supports Next.js.

## Environment Variables

Copy `env.example` to `.env.local` and fill in your API keys:

```bash
cp env.example .env.local
```

Required:
- `OPENAI_API_KEY`: Your OpenAI API key

Optional:
- `GROQ_API_KEY`: For Groq LLM support
- `GOOGLE_API_KEY`: For Google Gemini support

## API Endpoints

The following API endpoints are available:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/check-username/[username]` - Check username availability
- `GET /api/auth/me` - Get current user info

### Chat
- `POST /api/ask` - Ask questions to the AI
- `GET /api/status` - System status
- `GET /api/llm-options` - Available LLM options

## Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

## Notes

- The original Python FastAPI backend (`main.py`) has been converted to Next.js API routes
- PDF processing and RAG functionality has been simplified for serverless deployment
- For full RAG functionality, consider using external services like Pinecone or Weaviate
- The `pdfs/` folder and Python dependencies are no longer needed for deployment

## Troubleshooting

1. **Build Errors**: Make sure all environment variables are set
2. **API Errors**: Check that your API keys are valid and have sufficient credits
3. **Deployment Issues**: Ensure your hosting platform supports Next.js 14+

## Migration from Python Backend

If you need the full Python RAG functionality:

1. Deploy the Python backend separately (e.g., on Railway, Render, or AWS)
2. Update the API calls in your frontend to point to the Python backend URL
3. Keep the Next.js frontend for the UI and user management
