import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
      fileName: 'index'
    },
  }
})