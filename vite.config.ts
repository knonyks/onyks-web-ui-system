import { defineConfig } from 'vite';

export default defineConfig({
  server: 
  {
    proxy: 
    {}
  },
  appType: 'spa',
  build: 
  {
    lib: 
    {
      entry: 'src/index.ts',
      name: 'onyks-ui',
      fileName: 'index',
      formats: ['es'] 
    },
    rollupOptions: 
    {
      external: [/^lit/],
    }
  }
});