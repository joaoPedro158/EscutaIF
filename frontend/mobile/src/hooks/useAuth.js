import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Verifica se o usuário já tem uma sessão salva ao abrir o app
  useEffect(() => {
    async function loadStoragedData() {
      try {
        const storedToken = await AsyncStorage.getItem('@EscutaIF:token');
        const storedUser = await AsyncStorage.getItem('@EscutaIF:user');

        if (storedToken && storedUser) {
          // Configura o token no cabeçalho padrão do Axios para futuras requisições
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do armazenamento', error);
      } finally {
        setIsLoadingAuth(false);
      }
    }

    loadStoragedData();
  }, []);

  // Função de login conectada à API
  const login = async (email, password) => {
    try {
      const response = await api.post('/adm/login', {
        email,
        password
      });

      const { token, usuario } = response.data;

      // Salva os dados no dispositivo
      await AsyncStorage.setItem('@EscutaIF:token', token);
      await AsyncStorage.setItem('@EscutaIF:user', JSON.stringify(usuario));

      // Insere o token no cabeçalho das próximas requisições
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Atualiza o estado da aplicação
      setUser(usuario);
      
      return { success: true };
    } catch (error) {
      // Captura e retorna o erro do backend (ex: "Email ou senha incorretos")
      const errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor.';
      return { success: false, message: errorMessage };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@EscutaIF:token');
      await AsyncStorage.removeItem('@EscutaIF:user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (error) {
      console.error('Erro ao sair da conta', error);
    }
  };

  return { user, isLoadingAuth, login, logout };
}