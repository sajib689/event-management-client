/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  email?: string;
  [key: string]: any;
};

export async function middleware(request: NextRequest) {
  const token = request?.cookies.get("accessToken")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    // console.log(decodedToken, "dcoded token");

    if (!decodedToken?.email) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isStudentRoute = request.nextUrl.pathname.startsWith('/user-dashboard')
    if(isAdminRoute && decodedToken.role === "STUDENT" || isStudentRoute && decodedToken.role === "ADMIN") {
      const unauthorizedUrl = new URL ("/unauthorized", request.url)
      return NextResponse.redirect(unauthorizedUrl)
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/add-event", "/my-event"],
};