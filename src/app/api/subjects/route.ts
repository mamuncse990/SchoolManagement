import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const subjects = await prisma.subject.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 

