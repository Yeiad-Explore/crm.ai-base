import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

interface User {
  password: string;
  role: string;
  email?: string;
  full_name?: string;
  created_at?: string;
}

interface Users {
  [key: string]: User;
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

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const users = loadUsers();
    
    if (!users[username] || users[username].password !== password) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const userRole = users[username].role;
    const token = userRole === 'admin' ? 'admin_secret_token_2024' : `${username}_token_2024`;

    return NextResponse.json({
      access_token: token,
      user_role: userRole,
      message: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} login successful`
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
