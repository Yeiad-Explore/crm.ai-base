# 🚀 Quick Start Guide

## How to Run Your Restructured Project

Your project has been restructured for easy deployment on Vercel or Netlify. Here are the updated instructions:

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (required for AI functionality)

## 🏃‍♂️ Quick Start (Recommended)

### Option 1: Next.js Only (Simplified)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Copy the example file
   cp env.example .env.local
   
   # Edit .env.local and add your API keys
   OPENAI_API_KEY=your_openai_api_key_here
   GROQ_API_KEY=your_groq_api_key_here (optional)
   GOOGLE_API_KEY=your_google_api_key_here (optional)
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Full RAG System (Python Backend)

If you want the full RAG functionality with PDF processing:

1. **Install frontend dependencies**
   ```bash
   npm install
   ```

2. **Install Python dependencies**
   ```bash
   cd backend-python
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # In the root directory
   cp env.example .env.local
   
   # In backend-python directory
   cd backend-python
   cp ../env.example .env
   ```

4. **Start both servers**
   ```bash
   # Terminal 1: Start Python backend
   cd backend-python
   python main.py
   
   # Terminal 2: Start Next.js frontend
   npm run dev
   ```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables**
   - Go to Vercel dashboard
   - Add your API keys in project settings

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Python Backend (if using full RAG)
cd backend-python
python main.py       # Start FastAPI server
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # Serverless API routes
│   ├── components/        # React components
│   └── pages/            # Next.js pages
├── backend-python/        # Original Python backend (alternative)
├── components/            # Shared components
├── public/               # Static assets
├── vercel.json           # Vercel configuration
├── netlify.toml          # Netlify configuration
└── package.json          # Dependencies
```

## 🎯 What You Get

### Next.js Version (Simplified)
- ✅ Modern React frontend
- ✅ User authentication
- ✅ AI chat functionality
- ✅ Responsive design
- ✅ Easy deployment

### Python Backend (Full RAG)
- ✅ Everything above PLUS
- ✅ PDF document processing
- ✅ Vector storage and retrieval
- ✅ Document reranking
- ✅ Multiple LLM providers
- ✅ Advanced AI capabilities

## 🆘 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API key errors**
   - Make sure your `.env.local` file has the correct API keys
   - Check that the file is in the root directory

3. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

4. **Python backend issues**
   ```bash
   cd backend-python
   pip install --upgrade -r requirements.txt
   ```

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify your environment variables
3. Make sure all dependencies are installed
4. Check the deployment logs if deploying

## 🎉 You're Ready!

Your project is now structured for modern deployment while maintaining all functionality. Choose the option that best fits your needs!
