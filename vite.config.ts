// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  resolve: {
    alias: [
      { find: "msw/node", replacement: "/node_modules/msw/lib/native/index.mjs"}
    ],
  }
});
