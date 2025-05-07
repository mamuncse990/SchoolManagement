import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Processing password reset for email:', email);

    // Find user with the provided email
    const user = await prisma.user.findFirst({
      where: { 
        email: String(email)
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });

    console.log('User lookup result:', user ? 'Found' : 'Not found');

    // For security reasons, always return the same response regardless of whether the user exists
    if (!user) {
      console.log('User not found, returning generic response');
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, you will receive password reset instructions."
      });
    }

    // Generate a temporary password (8 characters)
    const tempPassword = Math.random().toString(36).slice(-8);
    console.log('Generated temporary password');
    
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    try {
      // Update user's password in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });
      console.log('Password updated in database');
    } catch (dbError) {
      console.error('Database update error:', dbError);
      throw new Error('Failed to update password in database');
    }

    try {
      // Create email transporter with Gmail-specific configuration
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS // This should be your app-specific password
        },
        debug: true,
        logger: true
      });

      console.log('Mail configuration:', {
        service: 'gmail',
        user: process.env.SMTP_USER
      });

      // Verify SMTP connection
      await transporter.verify();
      console.log('SMTP connection verified successfully');

      // Send email with new password
      const mailResult = await transporter.sendMail({
        from: `"School Management System" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset - School Management System',
        html: `
          <h1>Password Reset</h1>
          <p>Hello ${user.name},</p>
          <p>Your temporary password is: <strong>${tempPassword}</strong></p>
          <p>Please change this password after logging in.</p>
          <p>If you did not request this password reset, please contact support immediately.</p>
        `
      });

      console.log('Email sent successfully:', mailResult.messageId);

      return NextResponse.json({
        success: true,
        message: "Password reset instructions have been sent to your email."
      });

    } catch (emailError: any) {
      console.error('Email sending error:', {
        error: emailError.message,
        stack: emailError.stack,
        code: emailError.code,
        command: emailError.command
      });

      // Revert password change if email fails
      try {
        const newPassword = Math.random().toString(36).slice(-12);
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: newHashedPassword }
        });
        console.log('Password reverted after email failure');
      } catch (revertError) {
        console.error('Failed to revert password:', revertError);
      }
      
      throw new Error(`Failed to send password reset email: ${emailError.message}`);
    }

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ 
      success: false, 
      message: "An error occurred while processing your request",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}