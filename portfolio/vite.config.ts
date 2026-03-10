import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  cacheDir: '.norton_ignored',
  optimizeDeps: {
    esbuildOptions: {
      minify: false,
    },
  },
})
