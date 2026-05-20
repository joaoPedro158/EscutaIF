import axios from 'axios';

// DICA: 'localhost' não funciona no emulador Android.
// Use o IP da sua máquina na rede local (ex: 192.168.0.15) ao testar no celular físico.
const api = axios.create({
  baseURL: 'http://192.168.0.X:8000/api',
  timeout: 10000, // Cancela a requisição se demorar mais de 10 segundos
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor para tratamento global de respostas e erros
api.interceptors.response.use(
    (response) => {
      // Retorna os dados normalmente se o status for 2xx
      return response;
    },
    (error) => {
      if (error.response) {
        // O servidor Laravel retornou um erro (ex: 422 Validação, 500 Servidor)
        console.error(`Erro no servidor [Status ${error.response.status}]:`, error.response.data);
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta (servidor offline ou sem internet)
        console.error('Falha de rede: Nenhuma resposta recebida do servidor.');
      } else {
        // Erro na montagem da requisição no aplicativo
        console.error('Erro na requisição:', error.message);
      }
      return Promise.reject(error);
    }
);

export default api;