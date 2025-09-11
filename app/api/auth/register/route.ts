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

// Save users to JSON file
function saveUsers(users: Users): void {
  const usersFile = join(process.cwd(), 'users_data.json');
  try {
    writeFileSync(usersFile, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

// Check if username exists
function usernameExists(username: string, users: Users): boolean {
  return username.toLowerCase() in Object.keys(users).map(u => u.toLowerCase());
}

export async function POST(request: NextRequest) {
  try {
    const { username, password, confirm_password, email, full_name } = await request.json();
    
    // Validation
    if (!username || !password || !confirm_password) {
      return NextResponse.json(
        { error: 'Username, password, and confirm password are required' },
        { status: 400 }
      );
    }

    // Check username length
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: 'Username must be between 3 and 20 characters' },
        { status: 400 }
      );
    }

    // Check password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check password confirmation
    if (password !== confirm_password) {
      return NextResponse.json(
        { error: 'Password and confirm password do not match' },
        { status: 400 }
      );
    }

    const users = loadUsers();

    // Check if username already exists
    if (usernameExists(username, users)) {
      return NextResponse.json(
        { error: 'Username already exists. Please choose a different username.' },
        { status: 409 }
      );
    }

    // Check for invalid characters in username
    if (!username.replace(/[_-]/g, '').match(/^[a-zA-Z0-9]+$/)) {
      return NextResponse.json(
        { error: 'Username can only contain letters, numbers, underscores, and hyphens' },
        { status: 400 }
      );
    }

    // Register new user
    const newUser: User = {
      password: password,
      role: 'user',
      email: email,
      full_name: full_name,
      created_at: new Date().toISOString()
    };

    users[username] = newUser;
    saveUsers(users);

    return NextResponse.json({
      message: 'Registration successful! You can now login with your credentials.',
      username: username,
      role: 'user',
      status: 'success'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
