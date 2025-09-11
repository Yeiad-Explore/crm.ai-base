import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

interface Users {
  [key: string]: any;
}

// Load users from JSON file
function loadUsers(): Users {
  const usersFile = join(process.cwd(), 'users_data.json');
  if (existsSync(usersFile)) {
    try {
      const data = readFileSync(usersFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
  // Default users
  return {
    "admin": { "password": "admin123", "role": "admin" },
    "user": { "password": "user123", "role": "user" },
    "demo": { "password": "demo123", "role": "user" }
  };
}

// Check if username exists
function usernameExists(username: string, users: Users): boolean {
  return username.toLowerCase() in Object.keys(users).map(u => u.toLowerCase());
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (username.length < 3) {
      return NextResponse.json({
        available: false,
        message: 'Username too short (minimum 3 characters)'
      });
    }

    if (username.length > 20) {
      return NextResponse.json({
        available: false,
        message: 'Username too long (maximum 20 characters)'
      });
    }

    if (!username.replace(/[_-]/g, '').match(/^[a-zA-Z0-9]+$/)) {
      return NextResponse.json({
        available: false,
        message: 'Username can only contain letters, numbers, underscores, and hyphens'
      });
    }

    const users = loadUsers();

    if (usernameExists(username, users)) {
      return NextResponse.json({
        available: false,
        message: 'Username already taken'
      });
    }

    return NextResponse.json({
      available: true,
      message: 'Username is available'
    });

  } catch (error) {
    console.error('Check username error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
