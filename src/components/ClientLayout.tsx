'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/revamp/Navbar';
import { RevampFooter } from '@/components/revamp/Footer';
import { ThemeProvider } from '@/components/revamp/ThemeProvider';
import { CustomCursor } from '@/components/revamp/CustomCursor';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans relative transition-colors duration-300">
        <CustomCursor />
        {!isAdminRoute && <Navbar />}
        <main className="relative z-10">{children}</main>
        {!isAdminRoute && <RevampFooter />}
      </div>
    </ThemeProvider>
  );
}