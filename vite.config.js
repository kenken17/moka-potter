import { defineConfig } from 'vite'
export default defineConfig({
  base: '/',
  server: {
    port: 5173,
  },  // Change port if needed
  build: {
    outDir: '/home/ken/Projects/moka-potter/dist',
  },
})