import { NextRequest, NextResponse } from 'next/server'

// Rate limiting for uploads
const uploadRateLimitMap = new Map<string, { count: number; resetTime: number }>()

function rateLimitUpload(ip: string, limit: number = 5, windowMs: number = 300000): boolean { // 5 uploads per 5 minutes
  const now = Date.now()
  const key = `upload_${ip}`
  const userLimit = uploadRateLimitMap.get(key)

  if (!userLimit || now > userLimit.resetTime) {
    uploadRateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
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

function validateFile(file: File): { valid: boolean; error?: string } {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  // Check file type
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return { valid: false, error: 'Only PDF files are allowed' }
  }

  // Check file size (50MB limit)
  if (file.size > 50 * 1024 * 1024) {
    return { valid: false, error: 'File size too large. Maximum 50MB allowed.' }
  }

  // Check minimum file size (prevent empty files)
  if (file.size < 100) {
    return { valid: false, error: 'File appears to be empty or corrupted' }
  }

  // Check file name for security
  const fileName = file.name
  if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
    return { valid: false, error: 'Invalid file name' }
  }

  // Check for suspicious file names
  const suspiciousPatterns = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i
  if (suspiciousPatterns.test(fileName)) {
    return { valid: false, error: 'Invalid file name' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting for uploads
    const clientIP = getClientIP(request)
    if (!rateLimitUpload(clientIP)) {
      return NextResponse.json(
        { error: 'Upload rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create FormData for backend
    const backendFormData = new FormData()
    backendFormData.append('file', new Blob([buffer]), file.name)

    // Call your FastAPI backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 60000) // 60 second timeout for uploads
    
    const response = await fetch(`${backendUrl}/upload-pdf`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer admin_secret_token_2024',
        'User-Agent': 'CRM.AI-Frontend/1.0',
      },
      body: backendFormData,
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      if (response.status === 413) {
        return NextResponse.json(
          { error: 'File too large for processing' },
          { status: 413 }
        )
      }
      
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Backend upload error: ${response.status}`)
    }

    const data = await response.json()

    // Validate response data
    if (!data.filename || typeof data.filename !== 'string') {
      throw new Error('Invalid response from upload service')
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      filename: data.filename,
      total_pdfs: data.total_pdfs || 0,
      total_chunks: data.total_chunks || 0,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Upload API error:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Upload timeout. Please try again with a smaller file.' },
          { status: 408 }
        )
      }
      
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Unable to connect to upload service. Please check if the backend is running.' },
          { status: 503 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred during upload. Please try again later.',
        success: false,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
