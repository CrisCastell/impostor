import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['194f9970570a.ngrok-free.app', '000c0ffcba7a.ngrok-free.app', 'localhost:3000'],
  },
})
