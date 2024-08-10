import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { configs } from "@/utils";

export const supabase: SupabaseClient = createClient(configs.supabase.url, configs.supabase.apiKey);
