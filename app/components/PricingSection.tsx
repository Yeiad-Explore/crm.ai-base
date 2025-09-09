'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Users, MessageCircle, BookOpen, Target } from 'lucide-react'

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses',
      icon: Users,
      color: 'blue',
      popular: false,
      features: [
        '1 AI Agent',
        'Up to 1,000 conversations/month',
        'Basic CRM integration',
        'Email support',
        'PDF knowledge base upload',
        'Standard response time',
        'Basic analytics',
        'Mobile app access',
      ],
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'For growing companies',
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        '3 AI Agents',
        'Up to 10,000 conversations/month',
        'Advanced CRM integration',
        'Priority support',
        'Unlimited PDF uploads',
        'Fast response time',
        'Advanced analytics & insights',
        'Custom workflows',
        'Multi-language support',
        'API access',
      ],
    },
    {
      name: 'Enterprise',
      price: '$599',
      period: '/month',
      description: 'For large organizations',
      icon: Crown,
      color: 'gold',
      popular: false,
      features: [
        'Unlimited AI Agents',
        'Unlimited conversations',
        'Full CRM ecosystem integration',
        'Dedicated support manager',
        'Custom AI training',
        'White-label options',
        'Advanced reporting & BI',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment option',
      ],
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-400/20 bg-blue-400/5 hover:border-blue-400/40'
      case 'purple':
        return 'border-purple-400/20 bg-purple-400/5 hover:border-purple-400/40'
      case 'gold':
        return 'border-yellow-400/20 bg-yellow-400/5 hover:border-yellow-400/40'
      default:
        return 'border-white/20 bg-white/5 hover:border-white/40'
    }
  }

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-400'
      case 'purple':
        return 'text-purple-400'
      case 'gold':
        return 'text-yellow-400'
      default:
        return 'text-white'
    }
  }

  return (
    <section id="pricing" className="section py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Rent Your <span className="gradient-text">AI CRM Agent</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include our core AI agent features with different levels of capacity and support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative card ${getColorClasses(plan.color)} ${
                plan.popular ? 'glow scale-105' : ''
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="glass rounded-full px-4 py-2 flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-semibold">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-4 glass rounded-2xl mb-4 ${getColorClasses(plan.color)}`}>
                  <plan.icon className={`h-8 w-8 ${getIconColor(plan.color)}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-white/60 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white'
                    : 'glass border border-white/20 text-white hover:bg-white/10'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold mb-2">Can I change my plan anytime?</h4>
                <p className="text-white/70 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is there a free trial?</h4>
                <p className="text-white/70 text-sm">We offer a 14-day free trial for all plans. No credit card required to start.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
                <p className="text-white/70 text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                <p className="text-white/70 text-sm">Yes, you can cancel your subscription at any time. No cancellation fees or hidden charges.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
