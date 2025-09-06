// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
export async function POST () {
  // Clear the usertoken cookie
  await cookies().set('usertoken', '', { maxAge: 0 });
  return NextResponse.json({ message: 'Logged out successfully' });
}