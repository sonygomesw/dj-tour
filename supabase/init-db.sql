-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users(id) primary key,
  name text not null,
  location text,
  avatar_url text,
  level text not null default 'Niveau 1 - DJ Débutant',
  points integer not null default 0,
  max_points integer not null default 1000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Social stats table
create table public.social_stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  platform text not null,
  followers integer not null default 0,
  trend_percentage decimal(5,2),
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint unique_user_platform unique (user_id, platform)
);

-- Events table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  venue text not null,
  event_date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Weekly goals table
create table public.weekly_goals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  description text not null,
  completed boolean default false,
  week_start date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone
);

-- Bookability scores table
create table public.bookability_scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  score integer not null,
  calculated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Performance data table
create table public.performance_data (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  date date not null,
  bookings integer not null default 0,
  followers integer not null default 0,
  engagement decimal(5,2) not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint unique_user_date unique (user_id, date)
);

-- Contacts table
create table public.contacts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  club text not null,
  role text,
  email text,
  instagram text,
  continent text,
  city text,
  status text not null default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint status_check check (status in ('new', 'contacted', 'responded', 'booked', 'rejected'))
);

-- Level progress table
create table public.level_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  level integer not null default 1,
  current_xp integer not null default 0,
  required_xp integer not null default 1000,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint unique_user_level unique (user_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.social_stats enable row level security;
alter table public.events enable row level security;
alter table public.weekly_goals enable row level security;
alter table public.bookability_scores enable row level security;
alter table public.performance_data enable row level security;
alter table public.contacts enable row level security;
alter table public.level_progress enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Social stats policies
create policy "Users can view their own social stats"
  on public.social_stats for select
  using (auth.uid() = user_id);

create policy "Users can update their own social stats"
  on public.social_stats for update
  using (auth.uid() = user_id);

create policy "Users can insert their own social stats"
  on public.social_stats for insert
  with check (auth.uid() = user_id);

-- Events policies
create policy "Users can view their own events"
  on public.events for select
  using (auth.uid() = user_id);

create policy "Users can insert their own events"
  on public.events for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own events"
  on public.events for update
  using (auth.uid() = user_id);

create policy "Users can delete their own events"
  on public.events for delete
  using (auth.uid() = user_id);

-- Weekly goals policies
create policy "Users can view their own goals"
  on public.weekly_goals for select
  using (auth.uid() = user_id);

create policy "Users can insert their own goals"
  on public.weekly_goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own goals"
  on public.weekly_goals for update
  using (auth.uid() = user_id);

create policy "Users can delete their own goals"
  on public.weekly_goals for delete
  using (auth.uid() = user_id);

-- Bookability scores policies
create policy "Users can view their own bookability scores"
  on public.bookability_scores for select
  using (auth.uid() = user_id);

create policy "Users can insert their own bookability scores"
  on public.bookability_scores for insert
  with check (auth.uid() = user_id);

-- Performance data policies
create policy "Users can view their own performance data"
  on public.performance_data for select
  using (auth.uid() = user_id);

create policy "Users can insert their own performance data"
  on public.performance_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own performance data"
  on public.performance_data for update
  using (auth.uid() = user_id);

-- Contacts policies
create policy "Users can view their own contacts"
  on public.contacts for select
  using (auth.uid() = user_id);

create policy "Users can insert their own contacts"
  on public.contacts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own contacts"
  on public.contacts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own contacts"
  on public.contacts for delete
  using (auth.uid() = user_id);

-- Level progress policies
create policy "Users can view their own level progress"
  on public.level_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own level progress"
  on public.level_progress for update
  using (auth.uid() = user_id);

create policy "Users can insert their own level progress"
  on public.level_progress for insert
  with check (auth.uid() = user_id);

-- Function to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger handle_contacts_updated_at
  before update on public.contacts
  for each row
  execute function public.handle_updated_at();

-- Create function to create profile after signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile after signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert default data for new users
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  -- Insert default social stats
  insert into public.social_stats (user_id, platform, followers)
  values 
    (new.id, 'SPOTIFY', 0),
    (new.id, 'TIKTOK', 0),
    (new.id, 'INSTAGRAM', 0);
  
  -- Insert initial bookability score
  insert into public.bookability_scores (user_id, score)
  values (new.id, 0);
  
  -- Insert initial level progress
  insert into public.level_progress (user_id)
  values (new.id);
  
  -- Insert initial performance data
  insert into public.performance_data (user_id, date)
  values (new.id, current_date);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create default stats after profile creation
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile(); 