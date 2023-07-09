import endpoints from "@/utils/endpoints";
import { NextResponse } from "next/server";

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  console.log("middleware running", request.headers.get("X-Access-Token"));
  if (requestHeaders.has("X-Access-Token")) {
    const token = requestHeaders.get("X-Access-Token");
    console.log(token);
  }

  //   return NextResponse.redirect(new URL('/', request.url))
  const res = NextResponse.next();

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    endpoints.login,
    endpoints.register,
    endpoints.forgotPassword,
    endpoints.dashboard + "/*",
  ],
};
