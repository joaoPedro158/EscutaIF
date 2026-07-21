export const PROCESS_STATUS_ORDER = ['PENDENTE', 'EM_ANALISE', 'CONCLUIDA', 'ARQUIVADA']

export const PROCESS_STATUS_LABELS = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em Análise',
  CONCLUIDA: 'Concluída',
  ARQUIVADA: 'Arquivada',
}

export const PROCESS_STATUS_MESSAGES = {
  PENDENTE: 'A denúncia foi recebida e aguarda início da análise pela equipe responsável.',
  EM_ANALISE: 'A denúncia está sendo revisada pela comissão de ética acadêmica.',
  CONCLUIDA: 'A apuração foi concluída e as ações institucionais aplicáveis já foram encaminhadas.',
  ARQUIVADA: 'O processo foi arquivado após a conclusão do fluxo de apuração.',
}

export const detalheDenunciaMock = {
  protocolo: '8492-23',
  tipoDenuncia: 'Assédio Moral',
  registradoEm: '12 de Outubro, 2023 às 14:30',
  descricao:
    'Durante a aula da disciplina de Redes, o professor utilizou de palavras ofensivas e desrespeitosas para se referir a uma pergunta feita por um aluno. O incidente ocorreu repetidas vezes durante a semana, criando um ambiente hostil na sala de aula. Outros alunos também presenciaram a situação.',
  dataIncidente: '10 de Outubro, 2023',
  local: 'Laboratório de Informática 3, Bloco C',
  pessoaAfetada: 'Aluno da turma de Informática do 3º ano.',
  statusAtual: 'EM_ANALISE',
  identificacao: {
    anonima: true,
  },
}
