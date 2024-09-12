import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");

  if (!tokenCookie || !tokenCookie.value) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const token = tokenCookie.value; // Получение значения из объекта RequestCookie

  try {
    // Верификация токена ПО ключу
    await jwtVerify(token, Buffer.from("your_secret_key"));
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
