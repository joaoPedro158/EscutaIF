import { defineConfig } from 'vite';
import net from 'node:net';

function probePort(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: '127.0.0.1', port });

    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.once('error', () => {
      resolve(false);
    });

    socket.setTimeout(300, () => {
      socket.destroy();
      resolve(false);
    });
  });
}


export default defineConfig(async () => ({
  server: {
    host: '0.0.0.0',
    port: 5134,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
