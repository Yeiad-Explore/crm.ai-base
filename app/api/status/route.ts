import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'ready',
      message: 'RAG system ready to answer questions',
      current_llm: {
        provider: 'openai',
        model: 'gpt-4o-mini'
      },
      reranker_available: false,
      vector_store_ready: false
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
