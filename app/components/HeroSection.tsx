'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Users, BookOpen, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section id="home" className="section flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 text-sm"
            >
              <Star className="h-4 w-4 text-yellow-400" />
              <span>AI-Powered CRM Agent Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Rent AI Agents for
              <span className="gradient-text block">Your CRM System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-white/80 max-w-2xl mx-auto"
            >
              Deploy intelligent AI agents that understand your business, process customer data, and provide instant support. No coding required - just upload your knowledge base and go live.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary flex items-center space-x-2 group">
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/chat">
                <button className="btn-secondary flex items-center space-x-2 group">
                  <Play className="h-5 w-5" />
                  <span>Live Demo</span>
                </button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">500+</div>
                <div className="text-white/60">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-white/60">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-white/60">AI Agents</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative">
              <motion.div
                className="glass rounded-3xl p-8 glow"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Image
                  src="/hero_image_12.jpg"
                  alt="AI CRM Agent Platform"
                  width={500}
                  height={400}
                  className="rounded-2xl w-full h-auto"
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -top-4 -left-4 glass rounded-xl p-4 w-32"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm font-semibold">AI Powered</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 glass rounded-xl p-4 w-32"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-semibold">Smart Learning</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 glass rounded-xl p-4 w-32"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-semibold">50K+ Users</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default HeroSection
