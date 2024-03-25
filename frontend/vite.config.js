import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    proxy:{
      "/api": {
        target: 'https://secure-chat-b0il0y9le-pratik123-coder.vercel.app',
      }
    }
  },
  build: {
    outDir: 'dist' 
  }
})
