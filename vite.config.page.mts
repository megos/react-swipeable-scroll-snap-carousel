import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  base: 'react-swipeable-scroll-snap-carousel',
  publicDir: false,
  build: {
    outDir: 'public',
  },
})
