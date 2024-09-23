import { resolve } from 'path';
import { defineConfig } from 'vite';

import packageJson from './package.json';

export default defineConfig({
  plugins: [],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
