// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route fetches user data by ID
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from 'next/server';
import {connectDB}  from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log(id);
    console.log('User API - Looking for user with ID:', id);
    await connectDB();
    
    const user = await User.findById(id).select('-password');
    
    console.log('User API - Found user:', user ? 'exists' : 'null');
    
    if (!user) {
      console.log('User API - User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('User API - Returning user data:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
