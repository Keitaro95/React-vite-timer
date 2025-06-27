import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { reactRouter } from '@react-router/dev/vite';
import { reactRouterHono } from '@lazuee/react-router-hono';
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    reactRouterHono({
      serverFile: 'functions/src/server.ts',
    }),
    reactRouter(),
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 3000,
  },
})
