'use client'

import { motion } from 'framer-motion'
import { Brain, Target, Lightbulb, Shield, Award, Users, Zap, Database, MessageSquare, BarChart3, Settings, Globe } from 'lucide-react'
import Image from 'next/image'
import MagicBento from './MagicBento'

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Intelligent CRM Integration',
      description: 'Seamlessly integrate with your existing CRM systems like Salesforce, HubSpot, and Pipedrive.',
      color: 'blue'
    },
    {
      icon: Database,
      title: 'Knowledge Base Management',
      description: 'Upload and manage your company documents, FAQs, and product information effortlessly.',
      color: 'purple'
    },
    {
      icon: MessageSquare,
      title: 'Multi-Channel Support',
      description: 'Deploy agents across email, chat, phone, and social media channels.',
      color: 'green'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Get detailed reports on customer interactions, agent performance, and business metrics.',
      color: 'yellow'
    },
    {
      icon: Settings,
      title: 'Custom Workflows',
      description: 'Create custom business processes and automation rules for your specific needs.',
      color: 'pink'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Serve customers in their preferred language with automatic translation capabilities.',
      color: 'indigo'
    },
  ]

  const crmFeatures = [
    {
      title: 'Lead Management',
      description: 'Automatically qualify and route leads based on your criteria',
      icon: Target
    },
    {
      title: 'Customer Support',
      description: 'Provide instant, accurate responses to customer inquiries',
      icon: MessageSquare
    },
    {
      title: 'Sales Assistance',
      description: 'Help sales teams with product information and pricing',
      icon: Award
    },
    {
      title: 'Data Processing',
      description: 'Extract and process customer data from various sources',
      icon: Database
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-400/10 text-blue-400 border-blue-400/20'
      case 'purple':
        return 'bg-purple-400/10 text-purple-400 border-purple-400/20'
      case 'green':
        return 'bg-green-400/10 text-green-400 border-green-400/20'
      case 'yellow':
        return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
      case 'pink':
        return 'bg-pink-400/10 text-pink-400 border-pink-400/20'
      case 'indigo':
        return 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20'
      default:
        return 'bg-white/10 text-white border-white/20'
    }
  }

  return (
    <section id="features" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Powerful <span className="gradient-text">CRM Features</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transform your customer relationship management with AI agents that understand your business and deliver exceptional customer experiences.
          </p>
        </motion.div>

        {/* Magic Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full mb-20"
        >
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </motion.div>

        {/* CRM Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4">Complete CRM Solution</h3>
              <p className="text-white/80 text-lg mb-6">
                Our AI agents are designed specifically for CRM operations, handling everything from lead generation to customer support with human-like intelligence.
              </p>
              <p className="text-white/80 text-lg">
                Deploy in minutes, scale instantly, and watch your customer satisfaction soar while reducing operational costs.
              </p>
            </div>

            <div className="space-y-6">
              {crmFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
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
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 glow">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                alt="CRM Dashboard Interface"
                width={600}
                height={400}
                className="rounded-2xl w-full h-auto"
              />
            </div>
            
            {/* Floating stats */}
            <motion.div
              className="absolute -top-6 -right-6 glass rounded-xl p-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-2xl font-bold gradient-text">99.9%</div>
              <div className="text-sm text-white/60">Accuracy</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 glass rounded-xl p-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-white/60">Available</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Integration Partners */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Integrates with Popular CRM Systems</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho'].map((crm, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:glow transition-all duration-300"
              >
                <div className="text-lg font-semibold text-white/80">{crm}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
