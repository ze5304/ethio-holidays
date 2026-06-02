import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   base: 'https://ze5304.github.io/ethio-holidays/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})