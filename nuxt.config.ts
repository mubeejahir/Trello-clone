// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  app: {
    head: {
      title: "Trello-clone",

      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, // Favicon link
      ],
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
  },
});
