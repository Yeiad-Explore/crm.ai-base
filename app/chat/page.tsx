'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, Settings, Home, ArrowUp, Loader2 } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: string
  provider?: string
  model?: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState('openai')
  const [selectedModel, setSelectedModel] = useState('gpt-4o-mini')
  const [hasMessages, setHasMessages] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const providers = [
    {
      name: 'openai',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      defaultModel: 'gpt-4o-mini'
    },
    {
      name: 'groq',
      models: ['deepseek-r1-distill-llama-70b', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'],
      defaultModel: 'deepseek-r1-distill-llama-70b'
    },
    {
      name: 'gemini',
      models: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
      defaultModel: 'gemini-1.5-flash'
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (messages.length > 0) {
      setHasMessages(true)
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      provider: selectedProvider,
      model: selectedModel
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          llm_provider: selectedProvider,
          model_name: selectedModel
        }),
      })

      const data = await response.json()

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString(),
          provider: selectedProvider,
          model: selectedModel
        }
        setMessages(prev => [...prev, botMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Sorry, I encountered an error. Please make sure the backend server is running and try again.',
        timestamp: new Date().toLocaleTimeString(),
        provider: selectedProvider,
        model: selectedModel
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const currentProvider = providers.find(p => p.name === selectedProvider)
  const availableModels = currentProvider?.models || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-white/60">
              <Bot className="h-4 w-4" />
              <span>CRM.AI Agent</span>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden"
          >
            <div className="max-w-4xl mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Provider</label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => {
                      setSelectedProvider(e.target.value)
                      const provider = providers.find(p => p.name === e.target.value)
                      if (provider) {
                        setSelectedModel(provider.defaultModel)
                      }
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {providers.map(provider => (
                      <option key={provider.name} value={provider.name} className="bg-black">
                        {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {availableModels.map(model => (
                      <option key={model} value={model} className="bg-black">
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div className={`flex-1 ${hasMessages ? 'pt-4' : 'flex items-center justify-center'}`}>
          {!hasMessages ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">How can I help you today?</h2>
              <p className="text-white/60 max-w-md mx-auto">
                Ask me anything about your business, customers, or products. I'm here to assist with your CRM needs.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-white/40">
                <span>Using {selectedProvider}</span>
                <span>•</span>
                <span>{selectedModel}</span>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 p-4 overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl p-4 shadow-lg ${message.type === 'user' ? 'bg-blue-500/20 border border-blue-500/20' : 'bg-white/5 border border-white/10'}`}>
                      <div className="prose prose-invert max-w-none">
                        {message.type === 'bot' ? (
                          <ReactMarkdown className="text-white text-sm leading-relaxed">
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-white/50">{message.timestamp}</p>
                        {message.provider && (
                          <p className="text-xs text-white/40">
                            {message.provider} • {message.model}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-600">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-white/60" />
                        <span className="text-sm text-white/60">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Fixed at Bottom */}
        <div className="flex-shrink-0 p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your CRM AI agent a question..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none transition-all duration-200"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                }}
              />
            </div>
            
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-2xl transition-all duration-200 ${
                inputValue.trim() && !isTyping
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {isTyping ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}