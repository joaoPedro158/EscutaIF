import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = '@EscutaIF:token';
const USER_KEY = '@EscutaIF:user';

export async function login(email, password) {
  try {
    const response = await api.post('/adm/login', { email, password });
    const { token, usuario } = response.data;

    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(usuario));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { success: true, usuario };
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Erro de conexão';
    return { success: false, message };
  }
}

export async function logout() {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    delete api.defaults.headers.common['Authorization'];
  } catch (e) {
    // ignore
  }
}

export async function getUser() {
  const raw = await AsyncStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function getToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export default { login, logout, getUser, getToken };
