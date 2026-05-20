import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Porta usada pelo backend durante o desenvolvimento
const DEV_PORT = 8080;

// Resolve a baseURL automaticamente com fallbacks úteis:
// - Use a variável de ambiente `API_BASE_URL` (defina via bundler ou global.API_BASE_URL)
// - Android emulator: 10.0.2.2
// - iOS simulator / web / device (dev): localhost (ou substitua por IP da sua máquina)
const envUrl = (typeof process !== 'undefined' && process.env?.API_BASE_URL) || global?.API_BASE_URL;
let resolvedBaseURL = envUrl || (
  Platform.OS === 'android'
    ? `http://10.0.2.2:${DEV_PORT}/api`
    : `http://localhost:${DEV_PORT}/api`
);

const api = axios.create({
  baseURL: resolvedBaseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Intercetor de Pedido (Request)
// Injeta automaticamente o token de autenticação em todos os pedidos que o necessitem.
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@EscutaIF:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao aceder ao armazenamento local para obter o token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercetor de Resposta (Response)
// Tratamento global de erros e verificação de expiração de sessão.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      console.error(`Erro no servidor [Status ${error.response.status}]:`, error.response.data);
      
      // Tratamento específico para o erro 401 (Não Autorizado)
      // Limpa os dados locais caso o token tenha expirado ou seja inválido no Laravel.
      if (error.response.status === 401) {
        console.warn('Sessão expirada. A remover as credenciais locais...');
        try {
          await AsyncStorage.multiRemove(['@EscutaIF:token', '@EscutaIF:user']);
        } catch (storageError) {
          console.error('Erro ao remover os dados da sessão:', storageError);
        }
      }
    } else if (error.request) {
      console.error('Falha de rede: Nenhuma resposta recebida do servidor.');
    } else {
      console.error('Erro na construção do pedido:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;