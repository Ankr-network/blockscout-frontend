import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { externals } from 'rollup-plugin-node-externals';

import packageJson from './package.json';

export default defineConfig({
  plugins: [
    // Required to pass mui theme context into telemetry components
    {
      ...externals(),
      enforce: 'pre',
    },
    svgr(),
    react(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
