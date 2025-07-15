export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wjepasrwmkyklnxgkhsu.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZXBhc3J3bWt5a2xueGdraHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTk2MjIsImV4cCI6MjA2Nzc5NTYyMn0.8lBcgPiZ21OyIlZyLncF0P6CI3JVUxG_pWEm2syXZ90'
  }
} 