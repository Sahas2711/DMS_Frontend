import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Match a package by its directory in node_modules rather than by substring, so
 * `react` does not also swallow unrelated packages such as `react-remove-scroll`
 * or `@tailwindcss/...`, and `lucide-react` is not mistaken for React itself.
 */
const packageOf = (id) => {
  const parts = id.split('node_modules/')
  if (parts.length < 2) return null
  const rest = parts[parts.length - 1].split('/')
  return rest[0].startsWith('@') ? `${rest[0]}/${rest[1]}` : rest[0]
}

const VENDOR_CHUNKS = {
  'vendor-react': ['react', 'react-dom', 'react-router', 'react-router-dom', 'scheduler'],
  // framer-motion and gsap are kept apart: the homepage needs framer-motion,
  // while gsap is only used by the service pages and should stay off the
  // critical path.
  'vendor-motion': ['framer-motion', 'motion-dom', 'motion-utils'],
  'vendor-gsap': ['gsap'],
  'vendor-scroll': ['lenis'],
  'vendor-icons': ['lucide-react'],
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const pkg = packageOf(id)
          if (!pkg) return

          for (const [chunk, packages] of Object.entries(VENDOR_CHUNKS)) {
            if (packages.includes(pkg)) return chunk
          }
          return 'vendor'
        }
      }
    },
    // Warn earlier than the default so a regression in bundle size is noticed.
    chunkSizeWarningLimit: 300
  }
})
