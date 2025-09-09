'use client'

import { motion } from 'framer-motion'
import { Brain, Target, Lightbulb, Shield, Award, Users } from 'lucide-react'
import Image from 'next/image'

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms that adapt to your learning patterns and optimize your study sessions.',
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Customized study plans and recommendations based on your strengths, weaknesses, and learning goals.',
    },
    {
      icon: Lightbulb,
      title: 'Smart Insights',
      description: 'Get real-time feedback and insights to identify knowledge gaps and improve your understanding.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and privacy measures.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Join thousands of students who have improved their grades and learning efficiency.',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow learners and get support from our community and expert tutors.',
    },
  ]

  return (
    <section id="about" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Why Choose <span className="gradient-text">StudyAgent</span>?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We're revolutionizing education with cutting-edge AI technology that makes learning more effective, engaging, and personalized than ever before.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 glow">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students collaborating with AI"
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
              <div className="text-2xl font-bold gradient-text">95%</div>
              <div className="text-sm text-white/60">Success Rate</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 glass rounded-xl p-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-sm text-white/60">AI Support</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-4">The Future of Learning is Here</h3>
              <p className="text-white/80 text-lg mb-6">
                StudyAgent combines the power of artificial intelligence with proven educational methodologies to create a personalized learning experience that adapts to your unique needs and learning style.
              </p>
              <p className="text-white/80 text-lg">
                Our platform analyzes your learning patterns, identifies knowledge gaps, and provides targeted recommendations to help you master any subject faster and more effectively.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-white/80">Adaptive learning algorithms</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-white/80">Real-time progress tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-400 rounded-full" />
                <span className="text-white/80">Interactive study materials</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-white/80">Expert tutor support</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:glow"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 glass rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
