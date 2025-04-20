import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = JSON.parse(searchParams.get('query') || '{}')
  
  try {
    const [data, count] = await prisma.$transaction([
      prisma.result.findMany({
        where: query
      }),
      prisma.result.count({ where: query })
    ])
    
    return NextResponse.json({ data, count })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 })
  }
} 