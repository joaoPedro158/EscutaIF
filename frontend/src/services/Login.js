import axios from 'axios';


export const validarLogin = (dados) => {
  const erros = {};

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
  } else if (dados.senha.length < 8 || dados.senha.length > 100) {
    erros.senha = 'A senha deve conter no mínimo 8 caracteres e no máximo 100';
  }

  return erros;
};

export const logarUsuario = async (dados) => {
  try {
    const payload = {
      email: dados.email?.trim(),
      senha: dados.senha,
    };

    console.log('Enviando requisição de login:', payload);
    const resposta = await axios.post('/api/adm/login/form', payload);

    if (resposta.data && resposta.data.token) {
      localStorage.setItem('@App:token', resposta.data.token);
      console.log('Token armazenado no localStorage:', resposta.data.token);
    }
    return resposta.data;
  } catch (error) {
    if (error.response && error.response.data) {
  
      throw error.response.data;
    }
    throw new Error(error.message || 'Erro ao conectar-se ao servidor.', { cause: error });
  }
};
