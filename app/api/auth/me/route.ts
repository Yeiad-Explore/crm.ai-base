import { NextRequest, NextResponse } from 'next/server';

// Simple token verification (in production, use proper JWT)
const ADMIN_TOKENS = new Set(['admin_secret_token_2024']);
const USER_TOKENS = new Set(['user_token_2024', 'demo_token_2024']);

function verifyToken(authorization: string | null) {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization header required');
  }

  const token = authorization.split(' ')[1];

  if (ADMIN_TOKENS.has(token)) {
    return { role: 'admin', token };
  } else if (USER_TOKENS.has(token)) {
    return { role: 'user', token };
  } else {
    throw new Error('Invalid token');
  }
}

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get('authorization');
    const currentUser = verifyToken(authorization);

    return NextResponse.json({
      role: currentUser.role,
      authenticated: true,
      token_valid: true
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unauthorized' },
      { status: 401 }
    );
  }
}
