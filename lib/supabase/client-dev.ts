import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Development mode: Email confirmation may be disabled');
  }

  return supabase;
}