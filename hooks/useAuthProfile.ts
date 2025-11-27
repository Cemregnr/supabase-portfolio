import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createUserProfile } from '@/lib/blog';

export function useAuthProfile() {
  useEffect(() => {
    const supabase = createClient();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Kullanıcı profili var mı kontrol et
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Profil yoksa oluştur
          if (!existingProfile) {
            try {
              await createUserProfile(
                session.user.id,
                session.user.email || '',
                session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User'
              );
              console.log('User profile created');
            } catch (error) {
              console.error('Error creating profile:', error);
            }
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);
}