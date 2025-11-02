import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1️⃣ Supabase session'ı güncelle
  const supabaseResponse = await updateSession(request);

  // 2️⃣ i18n middleware’i çalıştır
  const intlResponse = await intlMiddleware(request);

  // 3️⃣ Eğer i18n yönlendirme yapmışsa → Supabase cookie'lerini manuel kopyala
  if (intlResponse.redirected) {
    const cookies = supabaseResponse.cookies.getAll();
    for (const cookie of cookies) {
      intlResponse.cookies.set(cookie.name, cookie.value);
    }
    return intlResponse;
  }

  // 4️⃣ Aksi halde Supabase response’unu döndür
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
