// Test script to check Supabase connection
import { createClient } from '@/lib/supabase/client';

export async function testSupabaseConnection() {
  try {
    const supabase = createClient();
    
    console.log('🔧 Testing Supabase connection...');
    
    // Test basic connection
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('🔧 Session check result:', { session, sessionError });
    
    // Test database connection
    const { data: testData, error: dbError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    console.log('🔧 Database test result:', { testData, dbError });
    
    return {
      connectionOk: !sessionError && !dbError,
      sessionError,
      dbError,
      hasSession: !!session
    };
  } catch (error) {
    console.error('🔧 Connection test failed:', error);
    return {
      connectionOk: false,
      error: error
    };
  }
}