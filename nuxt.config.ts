// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:['assets/global.scss'],
  runtimeConfig:{
    apiSecret:'123',
    public:{
      apiBase:'/api'
    }
  },
  app: {
    head: {
      title: "村长的技术空间",
      meta: [
        { name: "description", content: "专注于前端技术分享" },
        { name: "keywords", content: "nuxt,vue,ts,frontend" },
      ]
    },
  },
  modules:['@nuxtjs/tailwindcss',"@huntersofbook/naive-ui-nuxt",'@nuxtjs/color-mode',[
    "@pinia/nuxt",
    {
      autoImports: [
        // 自动引入 `defineStore(), storeToRefs()`
        "defineStore",
        "storeToRefs"
      ],
    },
  ]],
  imports: {
    dirs: [
      // 扫描顶层目录中模块
      'composables',
      // 扫描内嵌一层深度的模块，指定特定文件名和后缀名
      'composables/*/index.{ts,js,mjs,mts}',
      // 扫描给定目录中所有模块
      'composables/**',
      'store'
    ]
  },
  plugins:['plugins/error.ts'],
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData:'@import "~/assets/_variables.scss";'
        }
      }
    }
  }
})
