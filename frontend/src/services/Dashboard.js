import { api } from './api';

export const getDashboardCount = async (curso = '', periodo = '', tipoDenuncia = '') => {
    try {
        const response = await api.get('/dashboard/count', {
            params: { curso, periodo, tipoDenuncia }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (count):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao buscar contagem do dashboard:', error);
        throw error;
    }
};

export const getDashboardSemanal = async (curso = '', periodo = '', tipoDenuncia = '') => {
    try {
        const response = await api.get('/dashboard/semanal', {
            params: { curso, periodo, tipoDenuncia }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (semanal):', error.response.data.mensagem);
            throw error.response.data;
        }
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

export const getDashboardPizzaGrafico = async (curso = '', periodo = '') => {
    try {
        const response = await api.get('/dashboard/pizzaGrafico', {
            params: { curso, periodo }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (pizzaGrafico):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao buscar dados do grafico de pizza:', error);
        throw error;
    }
};

export const getDashboardCategoriaGrafico = async () => {
    try {
        const response = await api.get('/dashboard/categoriaGrafico');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (categoriaGrafico):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao buscar dados do grafico de categoria:', error);
        throw error;
    }
};

export const getDashboardRelatorio = async (page = 0, statusDenuncia = '') => {
    try {
        const response = await api.get('/dashboard/relatorio', {
            params: { page, statusDenuncia }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (relatorio):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao buscar relatórios do dashboard:', error);
        throw error;
    }
};

export const getDashboardDenunciaById = async (id) => {
    try {
        const response = await api.get(`/denuncias/detalhe/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (denuncia detalhe):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao buscar detalhe da denuncia:', error);
        throw error;
    }
};

export const getDenunciaDetalhe = getDashboardDenunciaById;

export const atualizarStatusDenuncia = async (id) => {
    try {
        const response = await api.get(`/denuncias/atualizarStatus/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.mensagem) {
            console.error('Erro do backend (atualizar status):', error.response.data.mensagem);
            throw error.response.data;
        }
        console.error('Erro ao atualizar status da denuncia:', error);
        throw error;
    }
};
