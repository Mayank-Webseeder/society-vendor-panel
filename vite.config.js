import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://society-services-backend.onrender.com', // Backend URL
        changeOrigin: true, // Change the origin header to the target URL
        secure: false, // Disable SSL verification (useful for development)
        rewrite: (path) => path.replace(/^\/api\/api/, '/api'), // Remove extra `/api`
      },
    },
  },
});