import { api } from './api';

export const getDashboardCount = async () => {
    try {
        const response = await api.get('/dashboard/count');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar contagem do dashboard:', error);
        throw error;
    }
};

export const getDashboardSemanal = async () => {
    try {
        const response = await api.get('/dashboard/semanal');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar contagem semanal do dashboard:', error);
        throw error;
    }
};

export const getDashboardHumor = async () => {
    try {
        const response = await api.get('/dashboard/humorGeral');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar contagem de humor do dashboard:', error);
        throw error;
    }
};
