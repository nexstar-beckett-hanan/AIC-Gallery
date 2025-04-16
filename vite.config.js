import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  test: {
		environment: 'jsdom',
    globals: true,
    setupFilesAfterEnv: './vitest-setup.js',
	},
});
