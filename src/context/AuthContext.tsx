'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface AuthContextType {
  login: (role: string, id: string) => void;
  role: string | null;
  id: string | null;
  // Add other auth-related functions as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const login = (newRole: string, newId: string) => {
    setRole(newRole);
    setId(newId);
    localStorage.setItem('role', newRole);
    sessionStorage.setItem('role', newRole);
  };

  return (
    <AuthContext.Provider value={{ login, role, id }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 