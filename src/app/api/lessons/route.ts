import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = JSON.parse(searchParams.get('query') || '{}')
  
  try {
    const [data, count] = await prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        select: {
          id: true,
          name: true,
          class: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.lesson.count({ where: query })
    ])
    
    return NextResponse.json({ data, count })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
  }
} 