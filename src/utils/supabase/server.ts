import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Server-side Supabase client for App Router (Route Handlers & Server Components)

export async function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase server client missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient(url, anonKey, {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies();
        return cookieStore.get(name)?.value;
      },
      async set(name: string, value: string, options: any) {
        const cookieStore = await cookies();
        cookieStore.set({ name, value, ...options });
      },
      async remove(name: string, options: any) {
        const cookieStore = await cookies();
        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  });
}
