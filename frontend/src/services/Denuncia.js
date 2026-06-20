import axios from 'axios';

const enviarDenunciaAxios = async (dadosDenuncia) => {
  try {
    // O Axios faz toda a configuração de Headers e JSON por baixo dos panos
    const resposta = await axios.post('http://localhost:8000/api/denuncias', dadosDenuncia);
    
    // Se chegou aqui, o status é 2xx (Sucesso)
    console.log('Denúncia criada com sucesso:', resposta.data);

  } catch (error) {
    // Se o Laravel barrou na validação (status 422), o Axios captura aqui:
    if (error.response) {
      console.error('Erros do Laravel:', error.response.data.errors);
    } else {
      console.error('Erro de conexão:', error.message);
    }
  }
};