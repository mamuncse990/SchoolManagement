import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  try {
    const { table, id } = params;
    // Convert table name to match Prisma model name (first letter lowercase)
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const item = await (prisma as any)[modelName].findUnique({
      where: { id: isNaN(id as any) ? id : parseInt(id) },
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
  try {    const { table, id } = params;
    const data = await request.json();
    // Convert table name to match Prisma model name (first letter lowercase)
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    const updatedItem = await (prisma as any)[modelName].update({
      where: { id: isNaN(id as any) ? id : parseInt(id) },
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
    // Convert table name to match Prisma model name (first letter lowercase)
    const modelName = table.charAt(0).toLowerCase() + table.slice(1);
    await (prisma as any)[modelName].delete({
      where: { id: isNaN(id as any) ? id : parseInt(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/websites/[table]/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
