import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'PWA Test',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png'},
        { rel: 'manifest', href: "/manifest.json" }
      ],
      script: [ { src: '/registerSW.js' } ]
    },
  },
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')).toString(),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')).toString()
    }
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: { enabled: true },
        injectRegister: 'script',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      }),
    ]
  }
})
