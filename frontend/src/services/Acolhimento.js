import axios from 'axios';

export const enviarAcolhimento = async (dadosAcolhimento) => {
  try {
    console.log('Payload enviado ao backend:', dadosAcolhimento)
    const resposta = await axios.post('/api/acolhimento/form', dadosAcolhimento);
    console.log('Acolhimento criado com sucesso:', resposta.data);
    return resposta.data;

  } catch (error) {
    if (error.response) {
      console.error('Erros do Laravel:', error.response.data.errors);
      throw error.response.data;
    } else {
      console.error('Erro de conexão:', error.message);
      throw new Error(error.message || 'Erro de conexão com o servidor.');
    }
  }
};
