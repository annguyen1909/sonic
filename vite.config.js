import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  css: {
    postcss: false
  },
  server: {
    port: 3000,
    open: true
  }
});
