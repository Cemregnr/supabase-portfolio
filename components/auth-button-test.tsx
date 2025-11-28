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
import { User, FileText, LogOut, ChevronDown, Settings } from 'lucide-react';

export function AuthButtonTest() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Test için statik olarak login durumunu kontrol edelim
  useEffect(() => {
    // Test amaçlı false yapıyoruz - giriş yapmamış kullanıcı
    setIsLoggedIn(false);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex gap-1 sm:gap-2">
        <div className="w-20 h-8 bg-gray-200 animate-pulse rounded flex items-center justify-center">
          <span className="text-xs text-gray-500">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  // Test için giriş yapmış kullanıcı görünümü
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 text-xs sm:text-sm h-8 sm:h-9 hover:bg-gray-100">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">TC</span>
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:inline max-w-24 truncate">
                Test User
              </span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-white border border-gray-200 shadow-lg">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <span className="font-medium text-gray-900">Test User</span>
                <span className="text-xs font-normal text-gray-500">
                  test@example.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer py-2 w-full hover:bg-gray-50">
                <User className="w-4 h-4" />
                Profilim
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/profile/posts" className="flex items-center gap-2 cursor-pointer py-2 w-full hover:bg-gray-50">
                <FileText className="w-4 h-4" />
                Yazılarım
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link href="/profile/settings" className="flex items-center gap-2 cursor-pointer py-2 w-full hover:bg-gray-50">
                <Settings className="w-4 h-4" />
                Ayarlar
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600 py-2 w-full hover:bg-red-50">
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Giriş yapmamış kullanıcı
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