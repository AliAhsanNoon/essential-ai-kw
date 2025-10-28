// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route sends email verification links
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../../lib/EmailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        return NextResponse.json(
          { error: 'Email is already verified' },
          { status: 400 }
        );
      }
      
      // Update existing user with new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      existingUser.emailVerificationToken = verificationToken;
      existingUser.emailVerificationExpires = verificationExpires;
      await existingUser.save();

      // Send verification email
      await sendVerificationEmail(email, verificationToken);

      return NextResponse.json(
        { message: 'Verification email sent successfully' },
        { status: 200 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create temporary user (not saved to database yet)
    const tempUser = {
      email: email.toLowerCase(),
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      isEmailVerified: false
    };

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { 
        message: 'Verification email sent successfully',
        tempUser: {
          email: tempUser.email,
          verificationToken: tempUser.emailVerificationToken
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
