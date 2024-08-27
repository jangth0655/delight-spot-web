import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN } from './constants';

function filterPrivatePath(path: string) {
  const privatePathPatterns = [
    /^\/store\/edit(\/\d+)?$/, //
    /^\/my/,
    /^\/profile\/\d+$/,
    /^\/store\/\d+\/review\/edit\/\d+$/,
    /^\/store\/\d+\/review$/,
  ];
  return privatePathPatterns.some((pattern) => pattern.test(path));
}

export async function middleware(request: NextRequest) {
  const token = cookies().get(ACCESS_TOKEN);
  const isPrivate = filterPrivatePath(request.nextUrl.pathname);

  if (!token && isPrivate) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
