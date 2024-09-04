import { NextResponse } from "next/server";

/*
function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url));
}
export default middleware;

*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth; // This uath here serves as a middle function as well...

// matcher will set the middle ware for specific routes.
export const config = {
  matcher: ["/account"],
};
