// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  app: {
    head: {
      title: "Your App Title",
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});
