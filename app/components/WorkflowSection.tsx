'use client'

import { motion } from 'framer-motion'
import { Upload, Settings, MessageCircle, ArrowRight, CheckCircle, Sparkles, Zap, Brain } from 'lucide-react'
import Link from 'next/link'

const WorkflowSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Upload PDFs',
      description: 'Create your knowledge base by uploading PDF documents',
      icon: Upload,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 2,
      title: 'Select Provider',
      description: 'Choose your preferred AI provider and model',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 3,
      title: 'Start Chatting',
      description: 'Ask questions and get intelligent answers from your knowledge base',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/20'
    }
  ]

  const features = [
    {
      icon: Brain,
      title: 'Intelligent Understanding',
      description: 'AI that comprehends your business context'
    },
    {
      icon: Zap,
      title: 'Instant Responses',
      description: 'Get answers in seconds, not minutes'
    },
    {
      icon: Sparkles,
      title: 'Smart Learning',
      description: 'Continuously improves from your data'
    }
  ]

  return (
    <section id="workflow" className="section py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            How <span className="gradient-text">Easy</span> It Is
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get your AI-powered CRM agent up and running in just 3 simple steps. No coding required, no complex setup.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                {step.id}
              </div>

              {/* Step Card */}
              <div className={`glass rounded-2xl p-8 h-full border ${step.borderColor} hover:glow transition-all duration-300 group`}>
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{step.description}</p>

                {/* Gradient Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-5 rounded-full blur-2xl`} />
              </div>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <ArrowRight className="h-4 w-4 text-white" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />
            
            {/* Floating Elements */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" />
            <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-6 left-8 w-3 h-3 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using our AI agents to transform their customer relationships.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="/chat"
                  className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                >
                  <span className="text-lg">Try Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
              </motion.div>

              <p className="text-sm text-white/60 mt-4">
                No credit card required • Free to try • Setup in minutes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WorkflowSection
