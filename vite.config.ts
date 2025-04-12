// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths'; // Optional, for TypeScript path aliases

export default defineConfig({
  plugins: [
    react(), // Enables React Fast Refresh and JSX/TSX support
    viteTsconfigPaths(), // Optional: Supports tsconfig path aliases
  ],
  server: {
    port: 3000, // Development server port
    open: true, // Automatically open browser on server start
    host: true, // Allows access from network (e.g., for mobile testing)
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
  build: {
    outDir: 'dist', // Output directory for production build
    sourcemap: true, // Generate source maps for debugging
    minify: 'esbuild', // Use esbuild for minification (default)
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional: Use camelCase for CSS module class names
    },
  },
  resolve: {
    alias: {
      // Optional: Define aliases for cleaner imports
      '@': '/src',
    },
  },
  // Optional: Environment variable prefix
  envPrefix: 'VITE_',
});