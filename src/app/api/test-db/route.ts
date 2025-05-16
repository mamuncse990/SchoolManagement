import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get all model names
    const models = Object.keys(prisma).filter(key => !key.startsWith('_'));
    
    // Try to query a known table (Class)
    const classes = await prisma.class.findMany();
    
    return NextResponse.json({
      status: 'Connected',
      models,
      testQuery: {
        table: 'Class',
        count: classes.length,
        items: classes
      }
    });
  } catch (error: any) {
    console.error('Database test error:', error);
    return NextResponse.json({
      status: 'Error',
      error: error.message,
      code: error.code,
      meta: error.meta
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
