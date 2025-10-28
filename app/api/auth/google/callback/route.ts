// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route handles Google OAuth callback
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const state = searchParams.get("state"); 

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=access_denied`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=no_code`
      );
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();



    if (!tokenData.access_token) {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/login?error=token_error`
      );
    }

    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData?.access_token}`,
        },
      }
    );

    const googleUser = await userResponse.json();

    await connectDB();

    let user = await User.findOne({
      $or: [{ email: googleUser.email }, { googleId: googleUser.id }],
    });

    console.log('Google OAuth - Looking for user with email:', googleUser.email, 'or googleId:', googleUser.id);
    console.log('Google OAuth - Found user:', user ? `exists with ID ${user._id}` : 'not found');

    if (!user) {
      // User doesn't exist
      if (state === 'login') {
        // User tried to login but doesn't exist - show toast message
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/signup?message=Please sign up first to continue with Google login`);
      } else {
        // User is signing up - create account and redirect to home
        const [firstName, ...lastNameParts] = googleUser.name.split(' ');
        const lastName = lastNameParts.join(' ') || '';
        const username = googleUser.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
        
        const newUser = new User({
          username,
          firstName,
          lastName,
          email: googleUser.email,
          googleId: googleUser.id,
          isEmailVerified: true,
        });
        
        console.log('Google OAuth - Creating new user:', {
          username,
          firstName,
          lastName,
          email: googleUser.email,
          googleId: googleUser.id
        });
        
        try {
          await newUser.save();
          console.log('Google OAuth - User created with ID:', newUser._id);
        } catch (saveError) {
          console.error('Google OAuth - Error saving user:', saveError);
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}/login?error=user_creation_failed`
          );
        }
        
        // Redirect to login page after successful Google signup
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?message=Account created successfully! Please login to continue.`);
      }
    } else {
      if (!user.googleId) {
        user.googleId = googleUser.id;
        await user.save();
      }
      user.isEmailVerified = true;
      await user.save();

      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/?googleLogin=true&userId=${user._id}`
      );
    }
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/login?error=server_error`
    );
  }
}
