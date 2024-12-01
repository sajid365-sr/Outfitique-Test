import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Protected routes that require authentication
  const protectedPaths = ["/wardrobe", "/suggestions"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // Handle protected routes
  // if (isProtectedPath) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - login (auth pages)
     * - signup (auth pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public|login|signup).*)",
  ],
};
