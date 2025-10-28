// AUTHENTICATION API - COMMENTED OUT FOR CLIENT DEMO
// This API route handles Google OAuth authentication
// Uncomment when authentication is needed

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action') || 'signup'; // Default to signup
  
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    scope: "openid email profile",
    response_type: "code",
    access_type: "offline",
    prompt: "select_account consent",
    state: action, 
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}

