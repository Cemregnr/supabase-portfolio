import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🔧 Auth callback triggered');
  
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  console.log('🔧 Code:', code);
  console.log('🔧 Next:', next);
  console.log('🔧 Origin:', origin);

  if (code) {
    try {
      const supabase = await createClient();
      console.log('🔧 Supabase client created:', !!supabase);
      console.log('🔧 Supabase auth available:', !!supabase?.auth);
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('🔧 Exchange error:', error);
        return NextResponse.redirect(new URL('/auth/login?error=exchange_failed', origin));
      }
      
      console.log('✅ Auth successful, user:', data?.user?.email);
      console.log('✅ Redirecting to:', '/');
      
      // Ana sayfaya yönlendir  
      return NextResponse.redirect(new URL('/', origin));
      
    } catch (error) {
      console.error('🔧 Unexpected auth error:', error);
      return NextResponse.redirect(new URL('/auth/login?error=unexpected', origin));
    }
  }

  console.error('🔧 No code provided');
  return NextResponse.redirect(new URL('/auth/login?error=no_code', origin));
}