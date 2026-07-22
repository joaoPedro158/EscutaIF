import axios from 'axios';

const API_URL = '/api/denuncias/form';

const mapTipoDenuncia = (tipo) => {
  const mapa = {
    assedio: 'ASSEDIO',
    discriminacao: 'DISCRIMINACAO',
    violencia: 'VIOLENCIA',
    'conducta-inapropriada': 'CONDUTA_INAPROPRIADA',
    outro: 'OUTRO',
  };

  return mapa[tipo] || 'OUTRO';
};

export const enviarDenuncia = async (formData) => {
  const payload = {
    tipoDenuncia: mapTipoDenuncia(formData.type),
    descricao: formData.description,
    dataIncidente: formData.eventDate ? `${formData.eventDate}T00:00:00` : null,
    local: formData.eventLocation || null,
    pessoaAfetada: formData.affectedPerson?.trim() || 'Anonimo',
    nome: formData.nome?.trim() || null,
    email: formData.email?.trim() || null,
    telefone: formData.telefone?.trim() || null,
  };

  try {
    console.log('Payload enviado ao backend:', payload);
    const resposta = await axios.post(API_URL, payload);
    return resposta.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }

    throw new Error(error.message || 'Erro de conexão com o servidor.');
  }
};

export const getDenunciaById = async (id) => {
  try {
    const resposta = await axios.get(`/api/dashboard/denuncia/${id}`);
    return resposta.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw new Error(error.message || 'Erro de conexão com o servidor.');
  }
};