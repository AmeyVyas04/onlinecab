// app/api/auth/verify/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Get the cookie header
    const cookieHeader = request.headers.get('cookie');
    
    if (!cookieHeader) {
      return NextResponse.json({ error: 'No cookies found' }, { status: 401 });
    }
    
    // Parse cookies
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    const token = cookies.usertoken;
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Return user data (without sensitive information)
    return NextResponse.json({
      id: decoded.userId,
      name: decoded.name,
      email: decoded.email
    });
    
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}