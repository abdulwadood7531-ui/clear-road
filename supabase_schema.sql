-- Supabase schema for ClearRoad
-- NOTE: Do NOT execute automatically from the app. Run manually in Supabase SQL editor.

-- Enable pgcrypto for UUID generation if not already enabled
create extension if not exists "pgcrypto";

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Allow users to manage their own profile
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);


-- ROADMAPS TABLE
create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.roadmaps enable row level security;

-- Users can only see their own roadmaps
create policy "Users can view their own roadmaps" on public.roadmaps
  for select using (auth.uid() = user_id);

create policy "Users can insert their own roadmaps" on public.roadmaps
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own roadmaps" on public.roadmaps
  for delete using (auth.uid() = user_id);
