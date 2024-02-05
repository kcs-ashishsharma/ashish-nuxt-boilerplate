export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variable.scss" as *;',
        },
      },
    },
  },
  css: ["~/assets/scss/global.scss"],
   modules: [
    '@nuxt/image',
  ]
})
