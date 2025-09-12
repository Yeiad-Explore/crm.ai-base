'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, BookOpen, Clock, Target, Zap } from 'lucide-react'
import Image from 'next/image'

const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: BookOpen,
      title: 'Overwhelming Content',
      description: 'Students struggle with vast amounts of information and don\'t know where to focus their attention.',
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Poor study habits and inefficient learning methods lead to wasted time and poor results.',
    },
    {
      icon: Target,
      title: 'Lack of Personalization',
      description: 'One-size-fits-all approaches don\'t work for different learning styles and paces.',
    },
  ]

  const solutions = [
    {
      icon: Zap,
      title: 'Smart Content Curation',
      description: 'AI analyzes your learning goals and curates the most relevant content for your needs.',
    },
    {
      icon: CheckCircle,
      title: 'Optimized Study Plans',
      description: 'Personalized study schedules that adapt to your pace and maximize learning efficiency.',
    },
    {
      icon: Target,
      title: 'Adaptive Learning',
      description: 'Content difficulty adjusts in real-time based on your understanding and progress.',
    },
  ]

  return (
    <section id="solution" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            The <span className="gradient-text">Problem</span> & Our <span className="gradient-text">Solution</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Traditional learning methods are outdated and inefficient. We&apos;re here to change that with AI-powered solutions.
          </p>
        </motion.div>

        {/* Problem Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <span>The Problem</span>
            </h3>
            <p className="text-white/80 text-lg">Students face these common challenges in their learning journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card border-red-400/20 hover:border-red-400/40"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 glass rounded-xl bg-red-400/10">
                    <problem.icon className="h-6 w-6 text-red-400" />
                  </div>
                  <h4 className="text-xl font-semibold">{problem.title}</h4>
                </div>
                <p className="text-white/70">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <span>Our Solution</span>
            </h3>
            <p className="text-white/80 text-lg">How StudyAgent solves these problems with AI technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card border-green-400/20 hover:border-green-400/40 hover:glow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 glass rounded-xl bg-green-400/10">
                    <solution.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold">{solution.title}</h4>
                </div>
                <p className="text-white/70">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Before */}
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-6 text-red-400">Before StudyAgent</h4>
            <div className="glass rounded-2xl p-8">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop"
                alt="Traditional learning struggles"
                width={500}
                height={300}
                className="rounded-xl w-full h-auto mb-4"
              />
              <ul className="text-left space-y-2 text-white/70">
                <li>• Generic study materials</li>
                <li>• No progress tracking</li>
                <li>• One-size-fits-all approach</li>
                <li>• Limited feedback</li>
                <li>• Poor time management</li>
              </ul>
            </div>
          </div>

          {/* After */}
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-6 text-green-400">After StudyAgent</h4>
            <div className="glass rounded-2xl p-8 glow">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop"
                alt="AI-powered learning success"
                width={500}
                height={300}
                className="rounded-xl w-full h-auto mb-4"
              />
              <ul className="text-left space-y-2 text-white/70">
                <li>• Personalized content</li>
                <li>• Real-time analytics</li>
                <li>• Adaptive learning paths</li>
                <li>• Instant feedback</li>
                <li>• Optimized study schedules</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemSolutionSection
