import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

const publicPaths = ["/", "/sign-in*", "/sign-up*", "/api/webhook*"];

const isPublic = (path: string) => {
  return publicPaths.some((x) => 
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

export default clerkMiddleware(async (auth, req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  
  const userId = await auth().then(session => session?.userId);
  
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  // Protects all routes, including api/trpc
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 