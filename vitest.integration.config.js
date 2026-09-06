import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/**
 * Integration tests exercise the *real* frontend API client against a running
 * backend (uvicorn over HTTP). They are deliberately separate from the fast
 * unit suite so they can be run on demand (`npm run test:integration`).
 *
 * Prerequisite: the backend must be reachable at VITE_API_BASE_URL
 * (default http://localhost:8000) with a live database.
 */
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: ['src/integration/**/*.test.{js,jsx}'],
        setupFiles: ['./src/test/setup.js'],
        css: false,
        restoreMocks: true,
        clearMocks: true,
        testTimeout: 30000,
        hookTimeout: 30000,
    },
});
