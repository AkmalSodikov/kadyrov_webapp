import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framework7': ['framework7-react', 'framework7'],
          'vendor': ['react', 'react-dom'],
          'i18n': ['i18next', 'react-i18next']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/framework7-react/, /node_modules/]
    }
  },
  optimizeDeps: {
    include: ['framework7-react', 'framework7']
  },
  resolve: {
    alias: {
      'framework7/framework7-bundle.min.css': 'framework7/framework7-bundle.css',
      'framework7-icons/css/framework7-icons.css': 'framework7-icons/css/framework7-icons.css'
    }
  }
})
