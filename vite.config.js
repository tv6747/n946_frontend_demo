import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/n946_frontend_demo/', // 必須跟你的倉庫名稱一致，且前後都有斜線
})
