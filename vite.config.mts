import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Avoid includes react/jsx-runtime in bundle.
    react({ jsxRuntime: 'classic' }),
    vanillaExtractPlugin(),
    cssInjectedByJsPlugin(),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Carousel',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
})
