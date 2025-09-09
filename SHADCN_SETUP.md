# Shadcn/UI Integration Guide

This guide explains how the shadcn/ui component has been integrated into your CRM.AI project.

## 📁 Project Structure

Your project now follows the shadcn/ui structure:

```
├── components/
│   └── ui/
│       └── animated-ai-chat.tsx    # Main animated chat component
├── lib/
│   └── utils.ts                    # Utility functions (cn helper)
├── app/
│   ├── chat/
│   │   └── page.tsx               # New chat page with provider selection
│   └── demo/
│       └── page.tsx               # Original demo page
```

## 🛠️ Dependencies Added

The following dependencies were added to support shadcn/ui:

```json
{
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

## 🎯 Key Features Implemented

### 1. **Animated AI Chat Component** (`/components/ui/animated-ai-chat.tsx`)
- Full ChatGPT-style interface with animations
- Provider and model selection (OpenAI, Groq, Gemini)
- Command palette with CRM-specific commands
- File attachment support
- Real-time typing indicators
- Responsive design with glass morphism effects

### 2. **New Chat Page** (`/app/chat/page.tsx`)
- Full-page chat interface
- Provider/model selection in settings panel
- Message history sidebar
- Real-time chat with your FastAPI backend
- Error handling and loading states

### 3. **Utility Functions** (`/lib/utils.ts`)
- `cn()` function for conditional class merging
- Combines `clsx` and `tailwind-merge` for optimal class handling

## 🚀 How to Use

### 1. **Access the Chat Interface**
- **Main Chat**: Visit `/chat` for the full-featured interface
- **Demo**: Visit `/demo` for the original demo page
- **Home**: Click "Back to Home" or use navigation to return

### 2. **Provider and Model Selection**
- Click the settings icon (⚙️) in the top-right corner
- Select your preferred AI provider (OpenAI, Groq, Gemini)
- Choose the specific model for that provider
- Settings are applied immediately

### 3. **Chat Features**
- **Commands**: Type `/` to see available commands
- **File Upload**: Click the paperclip icon to attach files
- **Send**: Press Enter or click the Send button
- **History**: Click the settings icon to view chat history

## 🎨 Styling

The component uses:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Glass morphism** effects
- **Gradient backgrounds** with animated elements
- **Responsive design** for all screen sizes

## 🔧 Customization

### Adding New Providers
Edit the `providers` array in `animated-ai-chat.tsx`:

```typescript
const providers: Provider[] = [
  {
    name: "your-provider",
    models: ["model1", "model2"],
    defaultModel: "model1"
  }
];
```

### Adding New Commands
Edit the `commandSuggestions` array:

```typescript
const commandSuggestions: CommandSuggestion[] = [
  {
    icon: <YourIcon className="w-4 h-4" />,
    label: "Your Command",
    description: "Command description",
    prefix: "/your-command"
  }
];
```

### Customizing Styling
The component uses CSS variables and Tailwind classes. You can customize:
- Colors in the gradient backgrounds
- Glass morphism opacity
- Animation durations
- Component spacing and sizing

## 🔗 Backend Integration

The chat component integrates with your existing FastAPI backend:
- Sends messages to `/api/chat`
- Forwards to FastAPI `/ask` endpoint
- Supports provider and model selection
- Handles errors gracefully

## 📱 Responsive Design

The component is fully responsive:
- **Desktop**: Full sidebar with message history
- **Tablet**: Collapsible sidebar
- **Mobile**: Full-screen chat interface

## 🎯 Next Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Both Servers**:
   ```bash
   # Terminal 1: FastAPI backend
   python main.py
   
   # Terminal 2: Next.js frontend
   npm run dev
   ```

3. **Test the Integration**:
   - Visit `http://localhost:3000/chat`
   - Try different providers and models
   - Test the command palette
   - Upload files and chat

## 🐛 Troubleshooting

### Common Issues

1. **Component not found**: Make sure the `components/ui` folder exists
2. **Styling issues**: Ensure Tailwind CSS is properly configured
3. **Backend errors**: Check that your FastAPI server is running
4. **Provider errors**: Verify API keys are set in your environment

### Debug Mode

Enable debug mode to see detailed logs:
```bash
npm run dev -- --debug
```

## 📚 Additional Resources

- [Shadcn/UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Next.js Documentation](https://nextjs.org/docs)

---

The integration is now complete! You have a fully functional, animated AI chat interface with provider selection that integrates seamlessly with your existing CRM.AI platform.
