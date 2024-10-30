import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
     host: true,
     port: 3000,
     https: {
       key: "./certs/server.key",
       cert: "./certs/server.crt",
     },
  },
  preview: {
    host: true,
    port: 3000,
    https: {
      key: './certs/server.key',
      cert: './certs/server.crt',
    },
  },
  plugins: [react()],
})