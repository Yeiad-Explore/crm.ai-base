'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Upload, FileText, X, Bot, User, Plus, Settings, Download } from 'lucide-react'
import Image from 'next/image'

interface Message {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: string
  isLoading?: boolean
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploaded?: boolean
  error?: boolean
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI CRM agent. I can help you with customer inquiries, process orders, and provide support based on your knowledge base. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage('')
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: messages.length + 2,
      type: 'bot',
      content: 'Thinking...',
      timestamp: new Date().toLocaleTimeString(),
      isLoading: true,
    }
    setMessages(prev => [...prev, loadingMessage])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      })

      const data = await response.json()

      if (data.success) {
        const botResponse: Message = {
          id: messages.length + 2,
          type: 'bot',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString(),
          isLoading: false,
        }
        setMessages(prev => prev.map(msg => 
          msg.id === loadingMessage.id ? botResponse : msg
        ))
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please make sure the backend server is running and try again.',
        timestamp: new Date().toLocaleTimeString(),
        isLoading: false,
      }
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id ? errorMessage : msg
      ))
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    for (const file of files) {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      }
      
      // Add file to UI immediately
      setUploadedFiles(prev => [...prev, newFile])
      
      try {
        // Upload to backend
        const formData = new FormData()
        formData.append('file', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Upload failed')
        }
        
        // Update file status
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, uploaded: true } : f
        ))
        
      } catch (error) {
        console.error('Upload error:', error)
        // Mark file as failed
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, error: true } : f
        ))
      }
    }
    
    setShowUpload(false)
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">CRM.AI Demo</h1>
                <p className="text-sm text-white/60">AI Agent for Customer Relations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Knowledge Base</span>
              </button>
              <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Panel */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-black/10 backdrop-blur-sm"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Knowledge Base Files</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-400/50 transition-colors cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/80 mb-2">Click to upload PDF files</p>
                  <p className="text-sm text-white/60">Support for PDF documents up to 50MB</p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white/80">Uploaded Files:</h4>
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 glass rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className={`h-5 w-5 ${
                            file.uploaded ? 'text-green-400' : 
                            file.error ? 'text-red-400' : 
                            'text-blue-400'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-white/60">
                              {formatFileSize(file.size)} • {
                                file.uploaded ? 'Uploaded' :
                                file.error ? 'Upload failed' :
                                'Uploading...'
                              }
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-red-500/20 rounded"
                        >
                          <X className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                  {message.type === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className={`glass rounded-2xl p-4 max-w-3xl ${message.type === 'user' ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.isLoading && (
                    <div className="flex items-center space-x-2 mt-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-white/50 mt-2">{message.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-4">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your business, customers, or products..."
                  className="w-full px-4 py-3 pr-12 glass rounded-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage(e)
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-3 top-3 p-1 hover:bg-white/10 rounded"
                >
                  <Plus className="h-5 w-5 text-white/60" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 glass rounded-xl hover:bg-blue-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5 text-blue-400" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
