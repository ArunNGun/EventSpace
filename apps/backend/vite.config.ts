import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3002
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      output: {
        entryFileNames: '[name].js',
        format: 'esm'
      }
    }
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
      exportName: 'app',
      tsCompiler: 'typescript'
    })
  ],
  optimizeDeps: {
    exclude: ['fsevents']
  }
});