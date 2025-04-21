import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Fetching subjects...');
    
    if (!prisma) {
      throw new Error('Prisma client is not initialized');
    }

    const subjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });

    console.log('Subjects fetched:', subjects);
    
    return new NextResponse(JSON.stringify(subjects), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in subjects API:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch subjects' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 

