import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    const modelMap: { [key: string]: any } = {
      admin: prisma.admin,
      teacher: prisma.teacher,
      student: prisma.student,
      parent: prisma.parent,
    };

    const count = await modelMap[type || 'admin'].count();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch count" }, { status: 500 });
  }
} 