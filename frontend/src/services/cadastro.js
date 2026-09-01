import axios from 'axios';

export const validarCadastro = (dados) => {
  const erros = {};

 
  if (!dados.nome || !dados.nome.trim()) {
    erros.nome = 'O nome é obrigatório';
  } 
  
  else if (dados.nome.trim().length < 3 || dados.nome.trim().length > 100) {
    erros.nome = 'O nome deve ter entre 3 e 100 caracteres';
  }

 
  if (!dados.email || !dados.email.trim()) {
    erros.email = 'O e-mail é obrigatório';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email.trim())) {
      erros.email = 'Insira um e-mail válido';
    }
  }


  if (!dados.senha) {
    erros.senha = 'A senha é obrigatória';
  } 
 
  else if (dados.senha.length < 8 || dados.senha.length > 100) {
    erros.senha = 'A senha deve ter entre 8 e 100 caracteres';
  }


  if (!dados.confirma_senha) {
    erros.confirma_senha = 'A confirmação de senha é obrigatória';
  } else if (dados.senha !== dados.confirma_senha) {
    erros.confirma_senha = 'As senhas não coincidem';
  }

  return erros;
};


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

      throw error.response.data;
    }
    throw new Error(error.message || 'Erro ao conectar-se ao servidor.', { cause: error });
  }
};
