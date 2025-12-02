import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-white/80 py-4 text-xs text-muted-foreground backdrop-blur dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 md:flex-row md:px-8">
        <p>
          © {new Date().getFullYear()} <span className="font-medium text-foreground">ClearRoad</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/validate" className="hover:text-foreground">
            Wizard
          </Link>
          <Link
            href="/dashboard"
            className="hidden hover:text-foreground sm:inline-block"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
