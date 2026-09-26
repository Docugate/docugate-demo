import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // The backend runs separately on 8787 in development.
    proxy: { '/api': 'http://localhost:8787' },
  },
})
