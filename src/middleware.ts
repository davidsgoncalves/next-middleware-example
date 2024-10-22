import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';

const protectedRoutes = ['/wiki'];

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl

  if (protectedRoutes.some((prefix) => pathname.startsWith(prefix))) {
    if (!request.cookies.has('accessToken')) {
      const absoluteUrl = new URL('/', request.nextUrl.origin);

      return NextResponse.redirect(absoluteUrl.toString());
    }
  }

  if (pathname === '/') {
    if (request.cookies.has('accessToken')) {
      const absoluteUrl = new URL('/wiki/home', request.nextUrl.origin);

      return NextResponse.redirect(absoluteUrl.toString());
    }
  }

  return NextResponse.next();
}

export default middleware;
