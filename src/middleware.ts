export { default } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { routes } from './navigation';

// ----------------------------------------------------------------------

const allowedOrigins = ['https://acme.com', 'https://my-app.org'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ----------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  /**
   * Manual redirecting (with business conditions)
   */
  const requestPathname = request.nextUrl.pathname;
  switch (true) {
    // Home
    case requestPathname === routes.home:
      /* Redirect to Blog as landing page */
      return NextResponse.redirect(new URL(routes.blog.root, request.url));
      break;
  }

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
  console.log('ORIGIN', origin);

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(cs|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
