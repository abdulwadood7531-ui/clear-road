"use client";

import { createBrowserClient } from "@supabase/ssr";

// Lightweight singleton wrapper for the Supabase browser client
// Uses NEXT_PUBLIC_ env vars so it can run on the client.

let browserClient: ReturnType<typeof createBrowserClient<any>> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Supabase client missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }

    browserClient = createBrowserClient(url, anonKey);
  }

  return browserClient;
}
