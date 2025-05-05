import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = JSON.parse(searchParams.get('query') || '{}');

  try {
    const [data, count] = await prisma.$transaction([
      prisma.message.findMany({
        where: query,
        include: {
          User_Message_senderIdToUser: true,
          User_Message_receiverIdToUser: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.message.count({ where: query }),
    ]);

    return NextResponse.json({ data, count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { senderId, receiverId, content } = await request.json();
    const message = await prisma.message.create({
      data: {
        id: uuidv4(),
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
        content,
      },
    });
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, senderId, receiverId, content } = await request.json();
    const message = await prisma.message.update({
      where: { id },
      data: {
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
        content,
      },
    });
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
} 