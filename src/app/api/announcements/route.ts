import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const search = searchParams.get("search") || "";
    const p = page ? parseInt(page) : 1;
    const take = 10;
    const skip = (p - 1) * take;

    let where: Prisma.AnnouncementWhereInput = {};
    if (search) {
      where.title = { contains: search, mode: Prisma.QueryMode.insensitive };
    }

    const [data, count] = await Promise.all([
      prisma.announcement.findMany({
        where,
        include: { class: true },
        take,
        skip,
        orderBy: { date: 'desc' },
      }),
      prisma.announcement.count({ where }),
    ]);

    return NextResponse.json({ data, count });
  } catch (error) {
    console.error("API /api/announcements error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, classId, date } = body;

  if (!title || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const announcement = await prisma.announcement.create({
    data: { title, description, classId, date: new Date(date) },
  });

  return NextResponse.json(announcement, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, title, description, classId, date } = body;

  if (!id || !title || !description || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const announcement = await prisma.announcement.update({
    where: { id },
    data: { title, description, classId, date: new Date(date) },
  });

  return NextResponse.json(announcement);
} 