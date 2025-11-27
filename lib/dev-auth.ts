import { createClient } from '@/lib/supabase/client';


export async function devSignUp(email: string, password: string) {
  const supabase = createClient();
  
  try {
    console.log('🔧 Development sign up for:', email);
    
   
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`
      }
    });
    
    if (signUpError) {
      console.log('❌ Sign up error:', signUpError.message);
      
      
      if (signUpError.message.includes('already') || signUpError.message.includes('registered')) {
        console.log('👤 User exists, trying login...');
        
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (loginError) {
          throw new Error('Bu email ile zaten kayıt olunmuş ancak şifre hatalı');
        }
        
        return { 
          success: true, 
          data: loginData, 
          message: 'Kullanıcı zaten mevcut, giriş yapıldı',
          needsConfirmation: false 
        };
      }
      
      throw signUpError;
    }
    
    
    if (signUpData.user?.email_confirmed_at) {
      console.log('✅ Email already confirmed');
      return { 
        success: true, 
        data: signUpData, 
        message: 'Hesap oluşturuldu ve onaylandı',
        needsConfirmation: false 
      };
    }
    
    console.log('📧 Email confirmation needed');
    return { 
      success: true, 
      data: signUpData, 
      message: 'Hesap oluşturuldu, email doğrulama gerekli',
      needsConfirmation: true 
    };
    
  } catch (error: any) {
    console.error('❌ Dev sign up error:', error);
    return { success: false, error: error.message };
  }
}

export async function devLogin(email: string, password: string) {
  const supabase = createClient();
  
  try {
    console.log('🔧 Development login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.log('❌ Login error:', error.message);
      
      
      if (error.message.includes('Invalid login credentials')) {
        console.log('🔧 User not found, creating account...');
        
        
        const signUpResult = await devSignUp(email, password);
        
        if (signUpResult.success && !signUpResult.needsConfirmation) {
          console.log('✅ Auto-created user and logged in');
          return { success: true, data: signUpResult.data };
        }
        
        if (signUpResult.success && signUpResult.needsConfirmation) {
          
          console.log('🔧 Attempting auto-confirmation...');
          
          
          const retryLogin = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!retryLogin.error) {
            console.log('✅ Auto-confirmation successful');
            return { success: true, data: retryLogin.data };
          }
        }
        
        return { 
          success: false, 
          error: 'Kullanıcı oluşturuldu ancak email doğrulama gerekli. Development modunda otomatik giriş yapılamadı.',
          userCreated: true
        };
      }
      
      
      if (error.message.includes('Email not confirmed')) {
        return { 
          success: false, 
          error: 'Email doğrulama gerekli. Development modunda bu bypass edilmelidir.',
          needsEmailConfirmation: true 
        };
      }
      
      throw error;
    }
    
    console.log('✅ Login successful');
    return { success: true, data };
    
  } catch (error: any) {
    console.error('❌ Dev login error:', error);
    return { success: false, error: error.message };
  }
}