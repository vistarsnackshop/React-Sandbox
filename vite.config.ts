import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/sandbox/dist/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // The backend server's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: removes /api prefix
      },
    },
  },
});
