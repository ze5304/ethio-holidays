import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ethio-holidays/'  // ይህ መስመር ካልሆነ ይጨምሩት
})