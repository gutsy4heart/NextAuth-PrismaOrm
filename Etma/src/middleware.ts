import { NextRequest, NextResponse } from "next/server";

const authPages = ["/signin"];
const protectedPages = ["/dashboard", "/profile"];

export default async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;

    const isAuthPage = authPages.some((page) => pathName.startsWith(page));
    const isProtectedPage = protectedPages.some((page) => pathName.startsWith(page));

    // For now, allow all requests - implement proper auth logic later
    // when next-auth is properly configured
    
    if (isAuthPage) {
        // Redirect authenticated users away from auth pages
        return NextResponse.next();
    }

    if (isProtectedPage) {
        // For now, allow access - implement auth check when ready
        return NextResponse.next();
    }

    return NextResponse.next();
}