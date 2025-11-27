import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle locale-prefixed auth callback by rewriting the URL  
  if (pathname.match(/^\/[a-z]{2}\/auth\/callback/)) {
    console.log('🔧 Locale-prefixed auth callback detected, rewriting to /auth/callback');
    const url = request.nextUrl.clone();
    url.pathname = '/auth/callback';
    
    // Use NextResponse.rewrite to internally handle the request at /auth/callback
    return NextResponse.rewrite(url);
  }

  // Handle direct auth callback
  if (pathname.startsWith('/auth/callback')) {
    console.log('🔧 Direct auth callback detected, processing');
    return await updateSession(request);
  }
  
  const intlResponse = intlMiddleware(request);

  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  const supabaseResponse = await updateSession(request);

  const cookies = supabaseResponse.cookies.getAll();
  for (const cookie of cookies) {
    intlResponse.cookies.set(cookie.name, cookie.value);
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
