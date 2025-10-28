// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route lists all users (for debugging)
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const users = await User.find({}).select('-password');
    
    console.log('Users API - Found users:', users.length);
    users.forEach(user => {
      console.log(`User ID: ${user._id}, Email: ${user.email}, GoogleId: ${user.googleId}`);
    });
    
    return NextResponse.json({
      count: users.length,
      users: users.map(user => ({
        id: user._id,
        email: user.email,
        googleId: user.googleId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

