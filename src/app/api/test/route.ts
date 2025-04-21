import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Testing database connection...');
    const test = await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful:', test);
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    )
  }
} 