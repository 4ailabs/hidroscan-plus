import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Añadido para resolver problemas de rutas en Vercel
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    minify: true,
    cssMinify: true,
    sourcemap: false
  }
})
