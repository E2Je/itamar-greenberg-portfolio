import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /itamar-greenberg-portfolio/, Vercel serves it from root.
// VERCEL is injected automatically into Vercel's build environment.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' && !process.env.VERCEL ? '/itamar-greenberg-portfolio/' : '/',
}));
