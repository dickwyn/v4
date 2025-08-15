import { NextResponse } from 'next/server';

// For now, we'll create a basic API route that will be replaced once
// TinaCMS generates the proper backend configuration
export async function GET() {
  return NextResponse.json({ message: 'TinaCMS API endpoint' });
}

export async function POST() {
  return NextResponse.json({ message: 'TinaCMS API endpoint' });
}
