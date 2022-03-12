import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './assets',
  resolve: {
    alias: {
      ammojs: '/ammo/ammo.js',
    },
  },
})
