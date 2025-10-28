// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route handles email verification
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import { sendWelcomeEmail } from '../../../lib/EmailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, userData } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // If userData is provided, update user with complete information
    if (userData) {
      const { username, firstName, lastName, password } = userData;
      
      // Check if username is already taken
      const existingUsername = await User.findOne({ 
        username, 
        _id: { $ne: user._id } 
      });
      
      if (existingUsername) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 409 }
        );
      }

      // Update user with complete information
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      if (password) {
        user.password = password; // Will be hashed by pre-save middleware
      }
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(user.email, user.firstName);

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email verification error:', error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
