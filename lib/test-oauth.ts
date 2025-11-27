import { createClient } from '@/lib/supabase/client'

export async function testGoogleOAuth() {
  console.log('🔧 Testing Google OAuth setup...')
  
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    
    console.log('✅ OAuth Data:', data)
    console.log('❌ OAuth Error:', error)
    
    return { data, error }
  } catch (err) {
    console.error('🔧 OAuth Test Error:', err)
    return { data: null, error: err }
  }
}