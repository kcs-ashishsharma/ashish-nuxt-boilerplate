export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: 'NUXT 3 CRUD Application meta desc'},
        {name: 'fromat-description', content: 'telephone-no'}
      ],
      link: [
        {
        rel:"stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",  
      },
      {
        rel: "stylesheet",
        href: "https:////cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css"
      }
    ],
      script:[
        {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
        type: 'text/javascript'
      },
      {
        src: "https://code.jquery.com/jquery-3.7.1.min.js",
        type: 'text/javascript'
      },
      {
        src: "https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js",
        type: 'text/javascript'
      }
    ]
    }
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,

    },
  },
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
  ],
})
