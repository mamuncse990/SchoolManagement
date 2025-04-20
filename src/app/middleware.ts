import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/auth/verify-user",
  "/api/webhook",
  //"/dashboard/list/teachers"
];

const isPublic = createRouteMatcher(publicPaths);

export const middleware = clerkMiddleware((auth, req) => {
  if (isPublic(req)) {
    return;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 