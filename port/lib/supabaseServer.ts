import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let serverSupabaseInstance: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient | null {
  if (serverSupabaseInstance) return serverSupabaseInstance;

  if (supabaseUrl && serviceRoleKey && supabaseUrl.startsWith('http')) {
    try {
      serverSupabaseInstance = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
      return serverSupabaseInstance;
    } catch (e) {
      console.warn('Failed to initialize server Supabase client:', e);
      return null;
    }
  }
  return null;
}
