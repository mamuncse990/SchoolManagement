import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const { table } = params;

    // Validate the table name to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const items = await (prisma as any)[table].findMany({
      where: search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error in GET /api/websites/[table]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const { table } = params;
    
    // Validate the table name to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    const data = await request.json();

    const newItem = await (prisma as any)[table].create({
      data,
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error in POST /api/websites/[table]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
