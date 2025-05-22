import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { masterDataConfigs } from "@/app/masterSetupConfig/masterDataConfig";

export async function POST(request: NextRequest, { params }: { params: { table: string } }) {
  try {
    const { table } = params;
    const config = masterDataConfigs[table];
    
    if (!config) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const model = (prisma as any)[config.tableName];
    if (!model) {
      console.error(`Model ${config.tableName} not found in Prisma schema`);
      return NextResponse.json({ error: "Invalid table configuration" }, { status: 500 });
    }    const data = await request.json();
    
    // Handle special cases for different tables
    let processedData = { ...data };
    
    if (config.tableName === 'Exam') {
      // Convert string fields to appropriate types for Exam
      processedData = {
        ...data,
        lessonId: data.lessonId ? parseInt(data.lessonId) : undefined,
        startTime: data.startTime ? new Date(data.startTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined
      };
    } else if (config.tableName === 'class') {
      // Convert numeric fields for class
      processedData = {
        ...data,
        id: data.id ? parseInt(data.id) : undefined,
        gradeId: data.gradeId ? parseInt(data.gradeId) : undefined,
        capacity: data.capacity ? parseInt(data.capacity) : undefined,
        supervisorId: data.supervisorId === '' || data.supervisorId === null || data.supervisorId === undefined ? null : data.supervisorId
      };
    }

    // Remove any undefined values
    Object.keys(processedData).forEach(key => {
      if (processedData[key] === undefined) {
        delete processedData[key];
      }
    });

    const item = await model.create({
      data: processedData,
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error in POST /api/master-data/[table]:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { table: string } }) {
  try {
    const { table } = params;
    const config = masterDataConfigs[table];
    
    if (!config) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const take = Number(searchParams.get('take')) || 10;
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * take;

    const where = search ? {
      OR: config.fields
        .filter(field => ['text', 'textarea'].includes(field.type))
        .map(field => ({
          [field.name]: {
            contains: search,
            mode: 'insensitive' as const,
          },
        })),
    } : {};

    const [items, total] = await Promise.all([
      (prisma as any)[config.tableName].findMany({
        where,
        skip,
        take,
      }),
      (prisma as any)[config.tableName].count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / take),
    });
  } catch (error) {
    console.error('Error in GET /api/master-data/[table]:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { table: string } }) {
  try {
    const { table } = params;
    const config = masterDataConfigs[table];
    
    if (!config) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const model = (prisma as any)[config.tableName];
    if (!model) {
      console.error(`Model ${config.tableName} not found in Prisma schema`);
      return NextResponse.json({ error: "Invalid table configuration" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Handle different ID types based on the model
    let parsedId: string | number = id;
    if (table === 'class') {
      parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
      }
    }

    await model.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/master-data/[table]:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
