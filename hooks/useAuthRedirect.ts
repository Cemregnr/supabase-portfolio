"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Save the current page before login
  const saveRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('authRedirectUrl', currentPath);
    }
  };

  // Redirect after successful auth
  const redirectAfterAuth = () => {
    if (typeof window !== 'undefined') {
      const redirectUrl = localStorage.getItem('authRedirectUrl');
      localStorage.removeItem('authRedirectUrl'); // Clean up
      
      // If we have a saved URL, use it; otherwise go to home
      const targetUrl = redirectUrl && redirectUrl !== '/auth/login' ? redirectUrl : '/';
      router.push(targetUrl);
    }
  };

  // Get redirect URL for auth pages
  const getRedirectUrl = () => {
    if (typeof window !== 'undefined') {
      const redirectUrl = searchParams.get('redirectTo');
      if (redirectUrl) {
        localStorage.setItem('authRedirectUrl', redirectUrl);
      }
    }
  };

  return {
    saveRedirectUrl,
    redirectAfterAuth,
    getRedirectUrl
  };
}