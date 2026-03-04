import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['icon.svg'],
            manifest: {
                name: 'Pomodoro Timer',
                short_name: 'Pomodoro',
                description: 'Pomodoro timer with tasks and offline support',
                theme_color: '#22333b',
                background_color: '#22333b',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any'},
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,woff2}'],
                cleanupOutdatedCaches: true,
                navigateFallback: null,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
