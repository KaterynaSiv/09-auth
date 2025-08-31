import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { parse } from "cookie";

const privateRoutes = ["/profile"];
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ----------------------

  if (isPrivateRoute) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          const data = await checkSessionServer();
          const setCookie = data.headers("set-cookie");

          if (setCookie) {
            const cookieArray = Array.isArray(setCookie)
              ? setCookie
              : [setCookie];
            for (const cookiesStr of cookieArray) {
              const parsed = parse(cookiesStr);
              const options: Partial<ResponseCookie> = {
                expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                path: parsed.Path,
                maxAge: parsed["Max-Age"]
                  ? Number(parsed["Max-Age"])
                  : undefined,
              };
              if (parsed.accessToken) {
                cookieStore.set("accessToken", parsed.accessToken, options);
              }
              if (parsed.refreshToken) {
                cookieStore.set("refreshToken", parsed.refreshToken, options);
              }
            }
          }
          return NextResponse.next();
        } catch {
          return NextResponse.redirect(new URL("/login", request.url));
        }
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ----------------------

  if (isPublicRoute) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/profile", "/login", "/register"] };
