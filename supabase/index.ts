import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// TODO: fix that to process.env
// For now tests fail when using envs
export const supabase = createClient(
  "https://nyvxhyvegpsrvrulpwny.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55dnhoeXZlZ3BzcnZydWxwd255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTI4NzAsImV4cCI6MTk4MzgyODg3MH0.Sa6O0ueL9zp7lso49rWFIiMMtUgGXn1chFxk0mik-Aw"
);
