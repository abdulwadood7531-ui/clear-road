'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getSupabaseBrowserClient } from '@/utils/supabase/client';

type User = {
  id: string;
  email?: string;
};

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    let isMounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? undefined } : null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const isLoginPage = pathname === '/login';

  return (
    <header className="border-b bg-white/80 backdrop-blur dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="ClearRoad logo"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">ClearRoad</span>
        </Link>

        <nav className="flex items-center space-x-3 text-sm">
          <Link
            href="/validate"
            className="hidden text-muted-foreground hover:text-foreground sm:inline-block"
          >
            Wizard
          </Link>
          <Link
            href="/dashboard"
            className="hidden text-muted-foreground hover:text-foreground sm:inline-block"
          >
            Dashboard
          </Link>
          {!loading && user && (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          )}
          {!loading && !user && !isLoginPage && (
            <Button size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
