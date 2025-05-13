import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Configuración para permitir JSX en archivos .js
      include: "**/*.{jsx,js}",
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // Añadir soporte explícito para archivos .jsx
  },
  build: {
    // Configuración específica de compilación
    rollupOptions: {
      input: 'index.html',
    }
  }
})
