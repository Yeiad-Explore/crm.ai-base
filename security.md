# Security Configuration

## API Security Features

### Rate Limiting
- **Chat API**: 20 requests per minute per IP
- **Upload API**: 5 uploads per 5 minutes per IP
- **Automatic cleanup**: Rate limit data expires automatically

### Input Validation
- **Message sanitization**: XSS protection with script tag removal
- **File validation**: PDF-only uploads with size limits (50MB max, 100 bytes min)
- **Provider validation**: Only allows OpenAI, Groq, and Gemini
- **Model validation**: String type checking for model names

### Error Handling
- **Timeout protection**: 30s for chat, 60s for uploads
- **Graceful degradation**: Proper error messages without exposing internals
- **Logging**: All errors logged for monitoring

### File Upload Security
- **File type validation**: Only PDF files allowed
- **File size limits**: 50MB maximum, 100 bytes minimum
- **Filename sanitization**: Prevents directory traversal attacks
- **Suspicious name detection**: Blocks Windows reserved names

## Environment Variables

Create a `.env.local` file with:

```env
# Backend Configuration
BACKEND_URL=http://localhost:8000

# Security (Optional - for production)
RATE_LIMIT_CHAT=20
RATE_LIMIT_UPLOAD=5
UPLOAD_TIMEOUT=60000
CHAT_TIMEOUT=30000

# API Keys (Set in your backend)
OPENAI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
GOOGLE_API_KEY=your_key_here
```

## Production Security Checklist

- [ ] Set up proper environment variables
- [ ] Configure HTTPS in production
- [ ] Set up proper CORS policies
- [ ] Implement proper authentication
- [ ] Set up monitoring and alerting
- [ ] Configure rate limiting with Redis
- [ ] Set up file scanning for malware
- [ ] Implement proper logging
- [ ] Set up backup and recovery
- [ ] Configure security headers

## Security Headers (Recommended)

Add these headers in your production deployment:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'
```

## Monitoring

Monitor these metrics:
- API response times
- Error rates
- Rate limit hits
- File upload success rates
- Backend connectivity
