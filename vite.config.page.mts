import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
  ],
  base: 'react-swipeable-scroll-snap-carousel',
  publicDir: false,
  build: {
    outDir: 'public',
  },
})
