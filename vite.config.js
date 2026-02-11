import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: 'https://coreflux.vercel.app/, https://joshuawiebe.github.io/CoreFlux/',
})
