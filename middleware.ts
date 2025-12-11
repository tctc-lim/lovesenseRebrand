import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Protect admin routes (except login)
    // Setup is now inside dashboard, so it's protected
    if (
        pathname.startsWith("/admin") &&
        !pathname.startsWith("/admin/login")
    ) {
        // Check for token in Authorization header or cookie
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.replace("Bearer ", "") || request.cookies.get("adminToken")?.value;

        if (!token) {
            // Redirect to login if no token found
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }

        // Token exists, but we'll let the API routes verify it
        // This prevents direct page access without a token
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
    ],
};

