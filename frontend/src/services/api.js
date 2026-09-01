import axios from 'axios';


export const api = axios.create({
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});


api.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem('@App:token');

        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        
        return Promise.reject(error);
    }

    


);

api.interceptors.response.use(
    (response) => {
       
        return response;
    },
    (error) => {

        if (error.response && error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('@App:token');
            
        
            window.location.href = '/login'; 
        }
        
        return Promise.reject(error);
    }
);