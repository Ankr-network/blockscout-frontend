// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
