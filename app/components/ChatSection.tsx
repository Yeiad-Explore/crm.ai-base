'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles, MessageCircle, Zap } from 'lucide-react'

const ChatSection = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI study assistant. How can I help you learn today?',
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages([...messages, userMessage])
    const currentMessage = message
    setMessage('')

    // Add loading message
    const loadingMessage = {
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
        // Replace loading message with actual response
        const botResponse = {
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
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please make sure the backend server is running and try again.',
        timestamp: new Date().toLocaleTimeString(),
        isLoading: false,
      }
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id ? errorMessage : msg
      ))
    }
  }

  return (
    <section id="chat" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Chat with Your <span className="gradient-text">AI Tutor</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the power of AI-powered tutoring with our intelligent chat interface that provides instant help and personalized guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 h-[600px] flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
              <div className="p-2 glass rounded-full bg-blue-400/20">
                <Bot className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">AI Study Assistant</h3>
                <p className="text-sm text-white/60">Online • Ready to help</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/60">Active</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${msg.type === 'user' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`glass rounded-2xl p-4 ${msg.type === 'user' ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                      <p className="text-sm">{msg.content}</p>
                      {msg.isLoading && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-white/50 mt-2">{msg.timestamp}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="flex-1 input-field"
              />
              <button
                type="submit"
                className="p-3 glass rounded-xl hover:bg-blue-500/20 transition-colors"
              >
                <Send className="h-5 w-5 text-blue-400" />
              </button>
            </form>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6">Why Our AI Chat is Different</h3>
              <p className="text-white/80 text-lg mb-8">
                Our AI tutor doesn't just answer questions - it understands your learning context, tracks your progress, and provides personalized guidance that adapts to your needs.
              </p>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 glass rounded-xl bg-blue-400/10">
                  <Sparkles className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Intelligent Responses</h4>
                  <p className="text-white/70">AI that understands context and provides detailed, helpful explanations tailored to your level.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 glass rounded-xl bg-purple-400/10">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">24/7 Availability</h4>
                  <p className="text-white/70">Get help whenever you need it, day or night. No waiting for office hours or appointments.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="p-3 glass rounded-xl bg-green-400/10">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Instant Feedback</h4>
                  <p className="text-white/70">Get immediate feedback on your questions and suggestions for improvement in real-time.</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 glow"
            >
              <h4 className="text-xl font-semibold mb-4">Try It Now!</h4>
              <p className="text-white/70 mb-4">
                Experience the power of AI tutoring. Ask any question about your studies and see how our AI responds.
              </p>
              <button className="btn-primary w-full">
                Start Chatting
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ChatSection
