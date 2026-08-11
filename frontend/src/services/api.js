import axios from 'axios';

// 1. Cria a instância base com a URL do seu Spring Boot
export const api = axios.create({
    baseURL: '/api', // Ajuste para a URL da sua API
    headers: {
        'Content-Type': 'application/json'
    }
});

// 2. Configura o Interceptor de Requisição (Request)
api.interceptors.request.use(
    (config) => {
        // Busca o token exatamente com a chave que você salvou no localStorage
        const token = localStorage.getItem('@App:token');

        // Se o token existir, injeta ele no cabeçalho Authorization
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        // Se der algum erro na preparação da requisição
        return Promise.reject(error);
    }

    // Adicione logo abaixo do interceptor de request, ainda dentro do api.js:


);

api.interceptors.response.use(
    (response) => {
        // Se a resposta do back-end vier com sucesso (status 2xx), só deixa passar
        return response;
    },
    (error) => {
        // Se o back-end retornar 401, significa que o JWT é inválido ou expirou
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('@App:token'); // Limpa o token expirado
            
            // Força o redirecionamento nativo para a página de login
            window.location.href = '/login'; 
        }
        
        return Promise.reject(error);
    }
);