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

async function resolveBackendTarget() {
  if (await probePort(8080)) {
    return 'http://127.0.0.1:8080';
  }

  if (await probePort(8000)) {
    return 'http://127.0.0.1:8000';
  }

  return 'http://127.0.0.1:8080';
}

export default defineConfig(async () => ({
  server: {
    host: '0.0.0.0',
    port: 5134,
    strictPort: true,
    proxy: {
      '/api': {
        target: await resolveBackendTarget(),
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
