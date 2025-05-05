import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: Request) {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = formidable({ multiples: false, uploadDir: path.join(process.cwd(), 'public', 'uploads'), keepExtensions: true });
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

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

    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
      },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Dedicated upload endpoint for local image storage
export async function POST(request: Request) {
  try {
    const { files } = await parseFormData(request);

    let imgPath = '';
    if (files.img) {
      const file = files.img as formidable.File;
      imgPath = `/uploads/${path.basename(file.filepath)}`;
    }

    return NextResponse.json({ imgPath }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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
    const body = await request.json();
    const { id, ...updateData } = body;
    if (!id) {
      return NextResponse.json({ error: 'Missing teacher id' }, { status: 400 });
    }
    if (updateData.birthday) {
      updateData.birthday = new Date(updateData.birthday);
    }
    try {
      const teacher = await prisma.teacher.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json(teacher);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 