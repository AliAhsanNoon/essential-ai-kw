// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route handles user login functionality
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user has a password (not a Google OAuth user trying to login with password)
    if (!user.password) {
      return NextResponse.json(
        { error: 'Please sign in with Google or reset your password' },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    // Return user data without password
    const userData = {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    };
    
    console.log('Login API - returning user data:', userData);
    
    return NextResponse.json(
      {
        message: 'Login successful',
        user: userData
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

