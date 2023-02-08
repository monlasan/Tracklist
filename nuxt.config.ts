// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@pinia/nuxt'],
  /// transpile  afew packages
  build: {
    transpile: [
      '@headlessui/vue',
      'vue-toastification',
      '@headlessui/tailwindcss',
    ],
  },
});
