import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // Normalize pathname (handle trailing slashes)
  const normalizedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Define paths
  const isAdminPath = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = normalizedPathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/admin/auth");

  // 1. Handle Admin APIs
  if (isAdminApi) {
    if (isAuthApi) return NextResponse.next();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 2. Handle Admin Pages
  if (isAdminPath) {
    if (token) {
      // Prevent authenticated users from seeing login page
      if (isLoginPage || normalizedPathname === "/admin") {
        const response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
      }
      return NextResponse.next();
    } else {
      // Force unauthenticated users to login page
      if (!isLoginPage) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url));
        response.headers.set('Cache-Control', 'no-store, max-age=0');
        return response;
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

// Config to match admin routes and their APIs
export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};