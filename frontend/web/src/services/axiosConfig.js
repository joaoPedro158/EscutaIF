import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Adiciona token Authorization (Bearer) automaticamente a cada requisição
api.interceptors.request.use((config) => {
  try {
    // Procura token nas duas chaves possíveis para compatibilidade web <-> mobile
    const token = localStorage.getItem('@EscutaIF:token') || localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default api;
