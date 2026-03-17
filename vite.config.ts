import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic',
            babel: {
                plugins: [],
            },
        }),
        laravel({
            input: ['resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
        // Importante: tsx y jsx primero para que tenga prioridad
        extensions: ['.tsx', '.jsx', '.ts', '.js'],
    },
    esbuild: {
        jsx: 'automatic',
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
});
