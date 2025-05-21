import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const { userId, password } = await request.json();

    // Verify hardcoded password
    if (password !== "Mamun123456") {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }    // Get user details with role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { 
        role: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }    // Sign out current user by clearing the token
    cookies().delete("token");
    
    // Create new token with the switched user
    const token = jwt.sign(
      { 
        userId: user.id,
        roleId: user.roleId,  // Important: include roleId for middleware
        role: user.role?.name || 'user',
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role?.name,
      },
    });

    // Set the new token in cookies with the response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Switch user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
