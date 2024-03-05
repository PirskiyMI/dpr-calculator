import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   base: '/vite-calculator-dpr/',
   plugins: [react()],
   resolve: {
      alias: {
         src: '/src',
      },
   },
});
