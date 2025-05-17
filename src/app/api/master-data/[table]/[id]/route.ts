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

    // Check if the item exists before updating
    const existingItem = await model.findUnique({
      where: { id: parsedId },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const data = await request.json();
    const updatedItem = await model.update({
      where: { id: parsedId },
      data,
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error in PUT /api/master-data/[table]/[id]:', error);
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
