import axios from 'axios';

/**
 * Valida os dados do cadastro no frontend de acordo com as regras de negócio.
 * @param {Object} dados - Dados do formulário
 * @returns {Object} Um objeto com os erros encontrados por campo, ou vazio se estiver tudo válido.
 */
export const validarCadastro = (dados) => {
  const erros = {};

  // O nome é obrigatório
  if (!dados.nome || !dados.nome.trim()) {
    erros.nome = 'O nome é obrigatório';
  } 
  // O nome deve ter entre 3 e 100 caracteres
  else if (dados.nome.trim().length < 3 || dados.nome.trim().length > 100) {
    erros.nome = 'O nome deve ter entre 3 e 100 caracteres';
  }

  // O e-mail é obrigatório
  if (!dados.email || !dados.email.trim()) {
    erros.email = 'O e-mail é obrigatório';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email.trim())) {
      erros.email = 'Insira um e-mail válido';
    }
  }

  // A senha é obrigatória
  if (!dados.senha) {
    erros.senha = 'A senha é obrigatória';
  } 
  // A senha deve ter entre 8 e 100 caracteres
  else if (dados.senha.length < 8 || dados.senha.length > 100) {
    erros.senha = 'A senha deve ter entre 8 e 100 caracteres';
  }

  // Confirmar Senha é obrigatório e deve ser igual à senha
  if (!dados.confirma_senha) {
    erros.confirma_senha = 'A confirmação de senha é obrigatória';
  } else if (dados.senha !== dados.confirma_senha) {
    erros.confirma_senha = 'As senhas não coincidem';
  }

  return erros;
};

/**
 * Envia os dados do cadastro para o backend Java.
 * @param {Object} dados - Dados do formulário (nome, email, senha, confirma_senha)
 * @returns {Promise<Object>} Resposta do servidor
 */
export const cadastrarAdministrador = async (dados) => {
  try {
    const payload = {
      nome: dados.nome?.trim(),
      email: dados.email?.trim(),
      senha: dados.senha,
      confirma_senha: dados.confirma_senha,
    };

    console.log('Enviando dados de cadastro ao backend:', payload);
    const resposta = await axios.post('/api/adm/form', payload);
    return resposta.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Lança a estrutura de erro do backend para tratamento no formulário
      throw error.response.data;
    }
    throw new Error(error.message || 'Erro ao conectar-se ao servidor.', { cause: error });
  }
};
