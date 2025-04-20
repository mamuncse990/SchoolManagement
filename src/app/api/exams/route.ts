import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

type ExamQuery = {
  lesson?: {
    classId?: string;
    teacherId?: string;
    subject?: {
      name?: {
        contains: string;
        mode: "insensitive";
      };
    };
    class?: {
      students?: {
        some: {
          id?: string;
          parentId?: string;
        };
      };
    };
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = JSON.parse(searchParams.get('query') || '{}')
  
  try {
    const [data, count] = await prisma.$transaction([
      prisma.exam.findMany({
        where: {
          ...query,
          lesson: {
            ...query.lesson,
            classId: query.lesson?.classId as any
          }
        },
        include: {
          lesson: {
            include: {
              subject: true,
              class: true,
              teacher: true
            }
          }
        }
      }),
      prisma.exam.count({ where: {
        ...query,
        lesson: {
          ...query.lesson,
          classId: query.lesson?.classId as any
        }
      } })
    ])
    
    return NextResponse.json({ data, count })
  } catch (error) {
    console.error('Error in /api/exams:', error);
    return NextResponse.json({ error: 'Failed to fetch exams' }, { status: 500 })
  }
} 