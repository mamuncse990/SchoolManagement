import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Verify JWT token first
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized - No token provided' },
        { status: 401 }
      );
    }

    // Verify the token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    let decoded;
    try {
      decoded = verify(token, process.env.JWT_SECRET) as { userId: number | string };
    } catch (error) {
      return NextResponse.json(
        { message: 'Unauthorized - Invalid token' },
        { status: 401 }
      );
    }

    const { userId, currentPassword, newPassword } = await request.json();

    // Convert both IDs to numbers for comparison
    const tokenUserId = typeof decoded.userId === 'string' ? parseInt(decoded.userId) : decoded.userId;
    const requestUserId = typeof userId === 'string' ? parseInt(userId) : userId;
    
    // Verify that the token userId matches the requested userId
    if (tokenUserId !== requestUserId) {
      console.log('User ID mismatch:', { 
        tokenUserId, 
        requestUserId,
        tokenUserIdType: typeof tokenUserId,
        requestUserIdType: typeof requestUserId
      });
      return NextResponse.json(
        { message: 'Unauthorized - User ID mismatch' },
        { status: 401 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: requestUserId },
      select: { id: true, password: true }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: requestUserId },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { message: 'An error occurred while changing the password' },
      { status: 500 }
    );
  }
}