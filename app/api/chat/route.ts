import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const key = ip
  const userLimit = rateLimitMap.get(key)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return '127.0.0.1'
}

function validateInput(message: string, llm_provider: string, model_name: string): { valid: boolean; error?: string } {
  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required and must be a non-empty string' }
  }
  
  if (message.length > 4000) {
    return { valid: false, error: 'Message is too long (max 4000 characters)' }
  }
  
  // Provider validation
  const validProviders = ['openai', 'groq', 'gemini']
  if (!validProviders.includes(llm_provider)) {
    return { valid: false, error: 'Invalid LLM provider' }
  }
  
  // Model validation
  if (model_name && typeof model_name !== 'string') {
    return { valid: false, error: 'Model name must be a string' }
  }
  
  // Sanitize message (basic XSS protection)
  const sanitizedMessage = message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
  
  return { valid: true, sanitizedMessage }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    if (!rateLimit(clientIP, 20, 60000)) { // 20 requests per minute
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request
    const body = await request.json()
    const { message, llm_provider = 'openai', model_name } = body

    const validation = validateInput(message, llm_provider, model_name)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const sanitizedMessage = validation.sanitizedMessage || message

    // Check if backend is available
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
    
    const response = await fetch(`${backendUrl}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CRM.AI-Frontend/1.0',
      },
      body: JSON.stringify({
        question: sanitizedMessage,
        llm_provider: llm_provider,
        model_name: model_name,
        use_reranker: true,
        max_chunks: 10
      }),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 503) {
        return NextResponse.json(
          { error: 'AI service is temporarily unavailable. Please try again later.' },
          { status: 503 }
        )
      }
      
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Backend error: ${response.status}`)
    }

    const data = await response.json()

    // Validate response data
    if (!data.answer || typeof data.answer !== 'string') {
      throw new Error('Invalid response from AI service')
    }

    return NextResponse.json({
      success: true,
      answer: data.answer,
      llm_used: data.llm_used || 'Unknown',
      chunks_used: data.chunks_used || 0,
      reranker_used: data.reranker_used || false,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 408 }
        )
      }
      
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Unable to connect to AI service. Please check if the backend is running.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred. Please try again later.',
        success: false,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
