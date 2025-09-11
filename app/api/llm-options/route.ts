import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      providers: {
        openai: {
          models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
          default: 'gpt-4o-mini'
        },
        groq: {
          models: ['deepseek-r1-distill-llama-70b', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768'],
          default: 'deepseek-r1-distill-llama-70b'
        },
        gemini: {
          models: ['gemini-pro', 'gemini-1.5-pro', 'gemini-1.5-flash'],
          default: 'gemini-1.5-flash'
        }
      }
    });
  } catch (error) {
    console.error('LLM options error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
