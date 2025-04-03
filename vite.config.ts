import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framework7': ['framework7-react'],
          'vendor': ['react', 'react-dom'],
          'i18n': ['i18next', 'react-i18next']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['framework7-react']
  }
})
