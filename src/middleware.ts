import { clerkMiddleware } from "@clerk/nextjs/server";

const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/auth/verify-user",
  "/api/webhook",
];

const isPublic = (path: string) => publicPaths.includes(path);

export default clerkMiddleware(async (auth, req) => {
  if (isPublic(req.nextUrl.pathname)) {
    return;
  }
  // Protect all other routes
  const authObj = await auth();
  if (!authObj.userId) {
    return new Response("Unauthorized", { status: 401 });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 