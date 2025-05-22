import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { masterDataConfigs } from "@/app/masterSetupConfig/masterDataConfig";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest, { params }: { params: { table: string; id: string } }) {
  try {
    const { table, id } = params;
    const config = masterDataConfigs[table];
    
    if (!config) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const model = (prisma as any)[config.tableName];
    if (!model) {
      console.error(`Model ${config.tableName} not found in Prisma schema`);
      return NextResponse.json({ error: "Invalid table configuration" }, { status: 500 });
    }

    // Get the model definition from Prisma's DMMF
    const dmmf = (Prisma as any).dmmf.datamodel.models.find(
      (m: any) => m.name.toLowerCase() === config.tableName.toLowerCase()
    );
    const idField = dmmf?.fields.find((f: any) => f.name === 'id');

    // Handle different ID types based on the model's schema
    let parsedId: string | number = id;
    if (idField?.type === 'Int') {
      parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        return NextResponse.json({ error: "Invalid ID format - expected a number" }, { status: 400 });
      }
    }

    const item = await model.findUnique({
      where: { id: parsedId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
    
  } catch (error) {
    console.error('Error in GET /api/master-data/[table]/[id]:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { table: string; id: string } }) {
  try {
    const { table, id } = params;
    const config = masterDataConfigs[table];
    
    if (!config) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const model = (prisma as any)[config.tableName];
    if (!model) {
      console.error(`Model ${config.tableName} not found in Prisma schema`);
      return NextResponse.json({ error: "Invalid table configuration" }, { status: 500 });
    }

    console.log('Processing update for table:', table);

    // Get the model definition from Prisma's DMMF
    const dmmf = (Prisma as any).dmmf.datamodel.models.find(
      (m: any) => m.name.toLowerCase() === config.tableName.toLowerCase()
    );
    if (!dmmf) {
      console.error(`Model definition not found for ${config.tableName}`);
      return NextResponse.json({ error: "Invalid model configuration" }, { status: 500 });
    }

    const idField = dmmf?.fields.find((f: any) => f.name === 'id');
    
    // Prepare update data
    const updateData = await request.json();
    console.log('Original update data:', updateData);

    // Parse ID and validate item exists
    const itemId = idField?.type === 'Int' ? parseInt(id, 10) : id;
    if (idField?.type === 'Int' && isNaN(itemId as number)) {
      return NextResponse.json({ error: "Invalid ID format - expected a number" }, { status: 400 });
    }

    const existingItem = await model.findUnique({
      where: { id: itemId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }    // Handle numeric fields and special cases for different tables
    if (config.tableName === 'Exam') {
      // Remove computed fields
      delete updateData.duration;
      
      // Convert ID fields to numbers
      updateData.id = updateData.id ? parseInt(updateData.id) : undefined;
      updateData.lessonId = updateData.lessonId ? parseInt(updateData.lessonId) : undefined;
      
      // Ensure dates are valid
      if (updateData.startTime) {
        const startDate = new Date(updateData.startTime);
        if (isNaN(startDate.getTime())) {
          return NextResponse.json({ error: "Invalid start time format" }, { status: 400 });
        }
        updateData.startTime = startDate;
      }
      
      if (updateData.endTime) {
        const endDate = new Date(updateData.endTime);
        if (isNaN(endDate.getTime())) {
          return NextResponse.json({ error: "Invalid end time format" }, { status: 400 });
        }
        updateData.endTime = endDate;
      }
    } else if (config.tableName === 'class') {
      // Convert numeric fields
      updateData.id = parseInt(updateData.id);
      updateData.gradeId = parseInt(updateData.gradeId);
      updateData.capacity = parseInt(updateData.capacity);
      
      // Handle optional supervisorId
      if (updateData.supervisorId === '' || updateData.supervisorId === null || updateData.supervisorId === undefined) {
        updateData.supervisorId = null;
      }
    }

    // Remove any undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    console.log('Processed update data:', { table: config.tableName, itemId, updateData });

    const updatedItem = await model.update({
      where: { id: itemId },
      data: updateData,
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error in PUT /api/master-data/[table]/[id]:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
