import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey);

  // Provide the Supabase client globally
  nuxtApp.provide('supabase', supabase);
});
