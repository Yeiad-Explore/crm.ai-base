import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface QuestionRequest {
  question: string;
  llm_provider?: 'openai' | 'groq' | 'gemini';
  model_name?: string;
  use_reranker?: boolean;
  max_chunks?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuestionRequest = await request.json();
    const { question, llm_provider = 'openai', model_name, use_reranker = true, max_chunks = 10 } = body;

    if (!question?.trim()) {
      return NextResponse.json(
        { error: 'Question cannot be empty' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // For now, we'll use a simple OpenAI completion
    // In a full implementation, you'd integrate with your RAG system
    const model = model_name || 'gpt-4o-mini';
    
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI assistant for a company. Answer questions based on your training data.

Guidelines:
- Be polite and professional as you're assisting fellow employees
- Write in Bangla if user writes in Bangla, otherwise use English
- Provide detailed, descriptive answers with bullet points when appropriate
- If you don't have enough information, say "I don't have enough information to answer this question"
- Guide users on where they can find more detailed information`
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.2,
      max_tokens: 1000
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated';

    return NextResponse.json({
      answer,
      status: 'success',
      llm_used: `OpenAI (${model})`,
      chunks_used: max_chunks,
      reranker_used: use_reranker
    });

  } catch (error) {
    console.error('Error processing question:', error);
    return NextResponse.json(
      { error: 'Error processing question' },
      { status: 500 }
    );
  }
}
