import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
        force: true
    },
    server: {
        host: '127.0.0.1', // force IPv4
        port: 5173,
        strictPort: true
    }
});
