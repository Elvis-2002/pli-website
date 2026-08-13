import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: '/' works with a custom domain (CNAME) pointed at GitHub Pages.
// If instead deploying to https://<user>.github.io/<repo>/ with no custom
// domain, change this to '/<repo>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
