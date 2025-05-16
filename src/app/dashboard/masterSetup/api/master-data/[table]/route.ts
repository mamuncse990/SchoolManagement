import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
  try {
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }    const table = params.table;
    console.log('Accessing table:', table);
      // Get available models from Prisma client
    const models = Object.keys(prisma).filter(key => 
      !key.startsWith('_') && 
      !key.startsWith('$')
    );
    console.log('Available models:', models);
    
    // Keep the table name as is - it should match the Prisma model name exactly
    const modelName = table;
    console.log('Looking for model:', modelName);
    // Try to find the model case-insensitively
    const matchingModel = models.find(m => m.toLowerCase() === modelName.toLowerCase());
    if (!matchingModel) {
      return NextResponse.json({ 
        error: `Invalid table name: ${table}. Available models: ${models.join(', ')}`,
        requestedModel: modelName,
        availableModels: models
      }, { status: 400 });
    }
    try {

      const { searchParams } = new URL(request.url);
      const page = Number(searchParams.get('page')) || 1;
      const take = Number(searchParams.get('take')) || 8;
      const query = searchParams.get('q') || '';
      const skip = (page - 1) * take;      // Define the search conditions based on available model fields
      let searchCondition = {};
      switch (matchingModel) {
        case 'class':
          searchCondition = {
            OR: [
              { name: { contains: query, mode: 'insensitive' } }
            ]
          };
          break;
        default:
          // For other models, just search in name field if it exists
          searchCondition = {
            name: { contains: query, mode: 'insensitive' }
          };
      }      const [items, count] = await Promise.all([
        (prisma as any)[matchingModel].findMany({
          where: searchCondition,
          skip,
          take,
          orderBy: { id: 'desc' }
        }),
        (prisma as any)[matchingModel].count({
          where: searchCondition
        }),
      ]);

      return NextResponse.json({ items, count });
    } catch (error) {
      console.error('Database error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ error: `Database error: ${errorMessage}` }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
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

    const table = params.table;
    if (!(table in prisma)) {
      return NextResponse.json({ error: 'Invalid table name' }, { status: 400 });
    }

    const data = await request.json();
    const newItem = await (prisma as any)[table].create({
      data: data,
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
