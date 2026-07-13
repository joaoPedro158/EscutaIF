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

export const getDashboardPizzaGrafico = async () => {
    try {
        const response = await api.get('/dashboard/pizzaGrafico');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do grafico de pizza:', error);
        throw error;
    }
};

export const getDashboardCategoriaGrafico = async () => {
    try {
        const response = await api.get('/dashboard/categoriaGrafico');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do grafico de categoria:', error);
        throw error;
    }
};
