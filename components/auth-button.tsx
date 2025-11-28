"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, FileText, LogOut, ChevronDown, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const supabase = createClient();
    
    // Mevcut kullanıcıyı al
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth check error:', error);
      } else {
        console.log('Current user:', user?.email || 'None');
        setUser(user);
      }
      setLoading(false);
    };

    getUser();

    // Auth değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email || 'None');
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN') {
          console.log('User signed in, refreshing...');
          router.refresh();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    console.log('Sign out clicked');
    setLoading(true);
    
    const supabase = createClient();
    await supabase.auth.signOut();
    
    setUser(null);
    setLoading(false);
    router.push('/');
    router.refresh();
  };

  // Prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="flex gap-1 sm:gap-2">
        <div className="w-20 h-8 bg-gray-100 rounded flex items-center justify-center">
          <span className="text-xs text-gray-400">...</span>
        </div>
      </div>
    );
  }

  // Kullanıcı giriş yapmışsa dropdown menü göster
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-xs sm:text-sm px-2 sm:px-3"
          >
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{user.email?.split('@')[0] || 'Kullanıcı'}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-sm">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
              <Settings className="w-4 h-4" />
              Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blog" className="flex items-center gap-2 cursor-pointer">
              <FileText className="w-4 h-4" />
              Blog Yazıları
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleSignOut}
            className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Kullanıcı giriş yapmamışsa login/signup butonları göster
  return (
    <div className="flex gap-1 sm:gap-2">
      <Button asChild size="sm" variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 text-gray-800 hover:bg-gray-100 border-gray-300">
        <Link href="/auth/login">Giriş</Link>
      </Button>
      <Button asChild size="sm" variant="default" className="text-xs sm:text-sm px-2 sm:px-3 bg-black text-white hover:bg-gray-800">
        <Link href="/auth/sign-up">Kayıt</Link>
      </Button>
    </div>
  );
}