'use client';

import { AuthProvider } from '../context/AuthContext';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Menu from './Menu';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWebsitesPage = pathname?.startsWith('/websites');

  return (
    <AuthProvider>
      {!isWebsitesPage && <Menu />}
      {!isWebsitesPage && <Header />}
      {children}
    </AuthProvider>
  );
} 