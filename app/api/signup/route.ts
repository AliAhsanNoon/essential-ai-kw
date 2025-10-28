// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route handles user signup functionality
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { username, firstName, lastName, email, password, confirmPassword } = body;

    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }
    }

    const newUser = new User({
      username,
      firstName,
      lastName,
      email: email.toLowerCase(),
      password, 
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser._id,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: newUser.createdAt
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Signup error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
