"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
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
import { User, FileText, LogOut, ChevronDown } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            
            // Load profile
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (mounted) {
                setProfile(profile);
              }
            } catch (error) {
              console.log('Profile not found');
            }
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth init error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Small delay to ensure hydration
    const timer = setTimeout(initAuth, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex gap-1 sm:gap-2">
        <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  // Authenticated user
  if (user) {
    const displayName = profile?.full_name?.trim() 
      ? profile.full_name 
      : user.email?.split('@')[0] || 'User';
    const avatarUrl = profile?.avatar_url || '';

    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9 hover:bg-gray-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden border">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold text-primary">
                    {displayName[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline max-w-24 truncate">
                {displayName}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-gray-900">{displayName}</span>
                <span className="text-xs font-normal text-gray-500">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer py-2">
                <User className="w-4 h-4" />
                Profilim
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/blog" className="flex items-center gap-2 cursor-pointer py-2">
                <FileText className="w-4 h-4" />
                Yazılarım
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="flex items-center gap-2 cursor-pointer text-red-600 py-2"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Not authenticated
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