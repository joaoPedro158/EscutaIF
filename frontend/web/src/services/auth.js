import api from './axiosConfig';

const TOKEN_KEY = '@EscutaIF:token';
const USER_KEY = '@EscutaIF:user';

export async function login(email, password) {
  try {
    const response = await api.post('/adm/login', { email, password });
    const { token, usuario } = response.data;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { success: true, usuario };
  } catch (error) {
    let message = error.response?.data?.message || error.message || 'Erro de conexão';
    if (typeof message === 'string' && message.includes('Server Error')) {
      message = 'Erro no servidor. Tente novamente mais tarde.';
    }
    return { success: false, message };
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete api.defaults.headers.common['Authorization'];
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export default { login, logout, getUser, getToken };
