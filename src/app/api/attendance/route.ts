import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = JSON.parse(searchParams.get('query') || '{}')
  
  try {
    const [data, count] = await prisma.$transaction([
      prisma.attendance.findMany({
        where: query,
        include: {
          student: true,
          lesson: {
            include: {
              class: true
            }
          }
        }
      }),
      prisma.attendance.count({ where: query })
    ])
    
    return NextResponse.json({ data, count })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch attendance data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Ensure the `present` field is treated as a boolean
    const present = body.present === true || body.present === "true";

    // Check if an ID is provided to determine if it's an update or a new entry
    if (body.id) {
      // Update existing attendance entry
      const updatedAttendance = await prisma.attendance.update({
        where: { id: body.id },
        data: {
          date: body.date,
          present: present,
          studentId: body.studentId,
          lessonId: body.lessonId,
        },
      });
      return NextResponse.json({ data: updatedAttendance });
    } else {
      // Create a new attendance entry
      const newAttendance = await prisma.attendance.create({
        data: {
          date: body.date,
          present: present,
          studentId: body.studentId,
          lessonId: body.lessonId,
        },
      });
      return NextResponse.json({ data: newAttendance });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process attendance data' }, { status: 500 });
  }
}