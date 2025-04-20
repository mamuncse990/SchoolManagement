import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    console.log('Login attempt for:', email);
    
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { 
        email: String(email)
      },
      select: {
        id: true,
        email: true,
        password: true,
        roleId: true,
        role: {
          select: {
            name: true
          }
        }
      }
    });

    console.log('Query result:', user);

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        message: 'User not found' 
      }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid password' 
      }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ 
        success: false, 
        message: 'Server configuration error' 
      }, { status: 500 });
    }

    // Create session token
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        roleId: user.roleId ?? 'USER'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role?.name ?? 'USER'
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error('Detailed login error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 