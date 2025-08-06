// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  // compatibility version 4 is required for the app directory and the relative paths are now based on ~ which points to the app directory
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["stores"],
  },
  colorMode: {
    preference: "light",
  },
  runtimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
});
