# CRM.AI - AI-Powered CRM Agents for B2B Companies

A modern, futuristic B2B platform built with Next.js, React, and TypeScript. CRM.AI allows companies to rent intelligent AI agents for their CRM systems with a beautiful frosted glass design and smooth animations.

## 🖥️ Interface Preview

![CRM.AI Interface](readme%20image.png)

## 🚀 Features

- **Modern UI/UX**: Futuristic design with frosted glass effects and smooth animations
- **Responsive Design**: Works perfectly on all devices and screen sizes
- **AI-Powered CRM Agents**: Deploy intelligent agents for customer service, lead management, and sales
- **PDF Knowledge Base**: Upload company documents and instantly train your AI agents
- **Responsive Chat Interface**: ChatGPT-style interface with smooth animations and markdown support
- **Provider Selection**: Choose between OpenAI, Groq, and Google Gemini with real-time switching
- **B2B Rental Model**: Monthly subscription plans for different business sizes
- **Multiple LLM Support**: Full integration with major AI providers
- **Interactive Sections**: 
  - Hero section with B2B focus and custom hero image
  - Features showcase for CRM capabilities
  - Live chat interface with provider/model selection
  - B2B pricing plans for different company sizes
  - Contact form for enterprise inquiries
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Serverless Ready**: Optimized for Vercel and Netlify deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Markdown**: React Markdown for AI response formatting
- **UI Components**: Shadcn/UI with custom animated components
- **Backend**: Next.js API routes (serverless) + Python FastAPI (optional)
- **AI Integration**: OpenAI, Groq, Google Gemini

## 📦 Installation

### Option 1: Quick Start (Next.js Only - Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd "base ai agent with react"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local and add your API keys
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here (optional)
GOOGLE_API_KEY=your_google_api_key_here (optional)
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

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

## 🚀 Deployment

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

## 🔗 Backend Options

### Next.js API Routes (Default)
- ✅ Serverless deployment ready
- ✅ User authentication
- ✅ AI chat functionality
- ✅ Easy to deploy and scale

### Python FastAPI Backend (Optional)
- ✅ Full RAG system with PDF processing
- ✅ Vector storage and retrieval
- ✅ Document reranking
- ✅ Advanced AI capabilities
- ✅ Multiple LLM provider support

**Note**: The Python backend is located in `backend-python/` directory and can be deployed separately if you need full RAG functionality.

## 🎯 Demo Features

- **Full-Page Chat Interface**: Visit `/chat` for a ChatGPT-style experience
- **Provider Selection**: Switch between OpenAI, Groq, and Gemini in real-time
- **Markdown Support**: AI responses with formatted text, lists, and code blocks
- **Smooth Animations**: Vertically centered start, smooth transitions to bottom
- **PDF Upload**: Upload your company documents to train the AI agent
- **Real-time Responses**: Get instant AI responses based on your knowledge base
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **No Setup Required**: Try it immediately without any configuration

## 💬 Chat Interface Features

### Responsive Design
- **Vertically Centered Start**: Chat window begins centered with welcome message
- **Smooth Animation**: Transitions to bottom when first message is sent
- **Fixed Input**: Black background input area always stays at bottom
- **Message Stacking**: Messages stack upward with conversation history at top

### Advanced Features
- **Provider Selection**: Real-time switching between OpenAI, Groq, and Gemini
- **Model Selection**: Choose specific models for each provider
- **Markdown Rendering**: AI responses with formatted HTML output
- **Auto-scroll**: New messages automatically scroll into view
- **Typing Indicators**: Real-time "AI is thinking..." with animated dots
- **Message History**: View all previous conversations with timestamps
- **Error Handling**: Graceful error messages if backend is unavailable

### User Experience
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Auto-resize Input**: Textarea automatically resizes as user types
- **Smooth Transitions**: Framer Motion animations throughout
- **Clean Design**: Rounded cards, soft shadows, and proper padding
- **Mobile Responsive**: Works perfectly on all screen sizes

## 🎨 Design Features

### Frosted Glass Theme
- Semi-transparent backgrounds with backdrop blur effects
- Subtle borders and glowing elements
- Smooth hover animations and transitions

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple gradient (#8b5cf6 to #ec4899)
- **Background**: Dark gradient with animated particles
- **Text**: White with various opacity levels

### Animations
- Floating particles in the background
- Smooth scroll-triggered animations
- Hover effects on interactive elements
- Loading states and micro-interactions

## 📱 Sections

1. **Hero Section**: Eye-catching introduction with custom hero image and animated elements
2. **Features Section**: CRM capabilities and integration highlights
3. **Demo Section**: Live demo showcase with call-to-action
4. **Chat Interface**: Full-page responsive chat with provider selection
5. **Pricing Section**: Three-tier B2B pricing plans with hover effects
6. **Contact Section**: Contact form and enterprise information
7. **Footer**: Links and social media

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                     # Serverless API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── ask/                 # Main chat endpoint
│   │   ├── status/              # System status
│   │   └── llm-options/         # Available LLM options
│   ├── components/              # React components
│   ├── chat/page.tsx            # Chat interface
│   ├── demo/page.tsx            # Demo page
│   └── page.tsx                 # Home page
├── backend-python/              # Original Python backend (alternative)
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── users_data.json          # User data
│   └── pdfs/                    # PDF documents
├── components/                  # Shared components
├── public/                      # Static assets
├── vercel.json                  # Vercel configuration
├── netlify.toml                 # Netlify configuration
└── package.json                 # Dependencies
```

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in dashboard

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Other Platforms
- **AWS Amplify**: Build settings: `npm run build`
- **Railway**: Automatic deployment from GitHub
- **Render**: Connect repository and deploy

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    // Your custom primary colors
  },
  secondary: {
    // Your custom secondary colors
  },
}
```

### Content
- Update text content in component files
- Replace placeholder images with your own
- Modify the navigation menu in `Navigation.tsx`

### Styling
- Customize CSS in `app/globals.css`
- Add new utility classes in Tailwind config
- Modify component-specific styles

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

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running in 5 minutes
- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [Project Structure](PROJECT_STRUCTURE.md) - Complete project organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Shadcn/UI](https://ui.shadcn.com/) for the component library
- [React Markdown](https://github.com/remarkjs/react-markdown) for markdown rendering

---

Built with ❤️ by the CRM.AI team