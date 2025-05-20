import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  try {
    const { table, id } = params;

    const item = await (prisma as any)[table].findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error in GET /api/websites/[table]/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  try {
    const { table, id } = params;
    const data = await request.json();

    const updatedItem = await (prisma as any)[table].update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error in PUT /api/websites/[table]/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  try {
    const { table, id } = params;

    await (prisma as any)[table].delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/websites/[table]/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
