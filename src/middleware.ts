import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/webhook*"];

const isPublic = (path: string) => {
  return publicPaths.some((x) => 
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

export async function middleware(request: NextRequest) {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { roleId: string; userId: string };
    
    // Check if the user has access to the requested route
    const path = request.nextUrl.pathname;
    const role = decoded.roleId;

    // Define route access rules
    const routeAccessMap: Record<string, string[]> = {
      "/dashboard/admin": ["admin"],
      "/dashboard/teacher": ["teacher"],
      "/dashboard/student": ["student"],
      "/dashboard/parent": ["parent"],
      "/list/teachers": ["admin", "teacher"],
      "/list/students": ["admin", "teacher"],
      "/list/parents": ["admin", "teacher"],
      "/list/subjects": ["admin"],
      "/list/classes": ["admin", "teacher"],
      "/list/exams": ["admin", "teacher", "student", "parent"],
      "/list/assignments": ["admin", "teacher", "student", "parent"],
      "/list/results": ["admin", "teacher", "student", "parent"],
      "/list/attendance": ["admin", "teacher", "student", "parent"],
      "/list/events": ["admin", "teacher", "student", "parent"],
      "/list/announcements": ["admin", "teacher", "student", "parent"],
    };

    // Check if the path matches any of the protected routes
    const matchingRoute = Object.keys(routeAccessMap).find(route => 
      path.startsWith(route)
    );

    if (matchingRoute) {
      const allowedRoles = routeAccessMap[matchingRoute];
      if (!allowedRoles.includes(role)) {
        // Redirect to appropriate dashboard based on role
        const dashboardRoutes: Record<string, string> = {
          admin: "/dashboard/admin",
          teacher: "/dashboard/teacher",
          student: "/dashboard/student",
          parent: "/dashboard/parent"
        };
        return NextResponse.redirect(new URL(dashboardRoutes[role] || "/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  // Protects all routes, including api/trpc
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 