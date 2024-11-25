// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  // Specify the Nuxt compatibility version (optional)
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'], // Ensure Vuetify is transpiled for compatibility
  },

  modules: [
    // Vite plugin for Vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error Ignore TypeScript error for plugin addition
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },

    '@pinia/nuxt', // Pinia for state management
    '@nuxtjs/supabase', // Supabase integration
    // Add other modules here
  ],
  plugins: ['~/plugins/supabase.js'],
  vite: {
    vue: {
      template: {
        transformAssetUrls, // Configure Vuetify's asset handling in Vue templates
      },
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY, // Ensure it's named "supabaseKey" to match usage
    },
  },

  
});
