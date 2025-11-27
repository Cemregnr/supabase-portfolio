"use client";

import { useAuthProfile } from '@/hooks/useAuthProfile';
import { ReactNode } from 'react';

export function AuthProfileProvider({ children }: { children: ReactNode }) {
  useAuthProfile();
  return <>{children}</>;
}