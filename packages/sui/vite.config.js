// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import packageJson from './package.json';

export default defineConfig({
  plugins: [
    svgr(),
    react(),
  ],
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: 'dist/esm',
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
        },
      ],
      external: [
        // Include mysten to dist
        ...Object.keys(packageJson.dependencies)
          .filter(packageName => !packageName.includes('@mysten'))
      ]
    }
  }
})