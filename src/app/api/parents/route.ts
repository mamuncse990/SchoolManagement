import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate and parse query parameters with defaults
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get('pageSize') || '8')));
    const search = searchParams.get('search')?.trim() || '';
    const query = {
      where: {
        ...(search && {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } }
          ]
        }),
      },
      include: {
        students: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        createdAt: Prisma.SortOrder.desc
      }
    };

    const [data, count] = await prisma.$transaction([
      prisma.parent.findMany(query),
      prisma.parent.count({ where: query.where }),
    ]);
   

    return NextResponse.json({ 
      data, 
      count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize)
    });

  } catch (error) {
    console.error('Parents API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}