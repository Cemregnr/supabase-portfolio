import { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1️⃣ i18n middleware'i önce çalıştır (locale redirect için)
  const intlResponse = intlMiddleware(request);

  // 2️⃣ Eğer i18n yönlendirme yapmışsa, direkt döndür
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse;
  }

  // 3️⃣ Supabase session'ı güncelle
  const supabaseResponse = await updateSession(request);

  // 4️⃣ Supabase cookie'lerini i18n response'una kopyala
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
