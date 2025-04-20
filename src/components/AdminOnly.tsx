'use client';

import { useAuth } from '../context/AuthContext';

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  
  if (role === 'admin') {
    return <>{children}</>;
  }
  
  return null;
} 