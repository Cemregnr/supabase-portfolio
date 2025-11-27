const DEV_USERS = new Map();

export function isDevMode() {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENV === 'development';
}

export async function simpleDevAuth(email: string, password: string, action: 'login' | 'signup') {
  if (!isDevMode()) {
    throw new Error('Simple dev auth only works in development');
  }
  
  console.log(`🔧 Simple dev auth (${action}) for:`, email);
  
  
  const userId = `dev-${email.split('@')[0]}-${Date.now()}`;
  
  if (action === 'signup') {
    DEV_USERS.set(email, { password, id: userId, email, created: Date.now() });
    console.log('✅ Dev user created:', email);
    
    return {
      success: true,
      user: {
        id: userId,
        email: email,
        email_confirmed_at: new Date().toISOString() // Auto-confirm
      },
      session: {
        access_token: `dev-token-${userId}`,
        user: { id: userId, email }
      }
    };
  }
  
  if (action === 'login') {
    const user = DEV_USERS.get(email);
    
    if (!user) {
      
      console.log('🔧 User not found, auto-creating...');
      return simpleDevAuth(email, password, 'signup');
    }
    
    if (user.password !== password) {
      throw new Error('Yanlış şifre');
    }
    
    console.log('✅ Dev login successful:', email);
    
    return {
      success: true,
      user: {
        id: user.id,
        email: email,
        email_confirmed_at: new Date().toISOString()
      },
      session: {
        access_token: `dev-token-${user.id}`,
        user: { id: user.id, email }
      }
    };
  }
}