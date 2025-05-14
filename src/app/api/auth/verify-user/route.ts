import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid request body' 
      }, { status: 400 });
    }

    const { email, password } = body;
    
    console.log('Login attempt for:', email);
    
    if (!email || !password) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email and password are required' 
      }, { status: 400 });
    }

    // Validate Prisma client
    if (!prisma) {
      console.error('Prisma client not initialized');
      return NextResponse.json({ 
        success: false, 
        message: 'Server configuration error' 
      }, { status: 500 });
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
        name: true,
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
        roleId: user.roleId ?? 'USER',
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        role: user.role?.name ?? 'USER',
        name: user.name,
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
    // Ensure we always return a JSON response
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID not provided' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}