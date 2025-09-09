'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Bot, MessageSquare, Upload, Zap, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const DemoSection = () => {
  const demoFeatures = [
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Experience our AI agent in action with instant responses'
    },
    {
      icon: Upload,
      title: 'PDF Upload',
      description: 'Upload your knowledge base and see instant integration'
    },
    {
      icon: Zap,
      title: 'Smart Responses',
      description: 'Get intelligent answers based on your business data'
    },
    {
      icon: CheckCircle,
      title: 'No Setup Required',
      description: 'Try it immediately without any configuration'
    }
  ]

  return (
    <section id="demo" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Try Our <span className="gradient-text">AI Agent</span> Live
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience the power of our CRM AI agent with a full-featured demo. Upload your documents and start chatting immediately.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 glow">
              <div className="bg-black/20 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-500 rounded-full">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">CRM.AI Agent</h3>
                    <p className="text-sm text-white/60">Online • Ready to help</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl p-4 max-w-xs">
                      <p className="text-sm">Hello! I'm your AI CRM agent. How can I help you today?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="glass rounded-2xl p-4 max-w-xs bg-blue-500/20">
                      <p className="text-sm">What are your pricing plans?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl p-4 max-w-xs">
                      <p className="text-sm">Based on our current pricing structure, we offer three tiers: Starter at $99/month, Professional at $299/month, and Enterprise at $599/month. Each includes different features and support levels...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 glass rounded-xl p-4 w-32"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-semibold">AI Powered</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 glass rounded-xl p-4 w-32"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-green-400" />
                <span className="text-sm font-semibold">Live Chat</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Features & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4">Interactive Demo</h3>
              <p className="text-white/80 text-lg mb-6">
                Experience our AI agent in a full ChatGPT-style interface. Upload your company documents and see how it can help your customers instantly.
              </p>
            </div>

            <div className="space-y-4">
              {demoFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-2 glass rounded-lg bg-blue-400/10">
                    <feature.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <Link href="/chat">
                <motion.button
                  className="btn-primary w-full flex items-center justify-center space-x-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="h-5 w-5" />
                  <span>Try Live Demo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <motion.button
                className="btn-secondary w-full flex items-center justify-center space-x-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Your Documents</span>
              </motion.button>
            </div>

            <div className="glass rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-3">What You Can Test:</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Upload PDF documents</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Ask questions about your business</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Get instant AI responses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Experience real-time chat</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DemoSection
