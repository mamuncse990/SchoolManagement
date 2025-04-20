import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token found' },
        { status: 401 }
      );
    }

    const decoded = verify(token.value, process.env.JWT_SECRET || 'your-secret-key');
    
    // Verify if the user still exists in the database
    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).userId },
      select: {
        id: true,
        email: true,
        roleId: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        roleId: user.roleId
      }
    });

  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
} 