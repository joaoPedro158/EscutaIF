// web/src/pages/Dashboard.jsx
import React, { useState } from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    BarChart2,
    AlertTriangle,
    Settings,
    Search,
    Bell,
    HelpCircle,
    Smile,
    TrendingUp,
    User,
    CheckCircle2,
    Filter,
    RefreshCw
} from 'lucide-react';

import '../styles/Dashboard.css';
import logoCampus from '../assets/Campus_Nova_Cruz_-_Logo_Color_Hor.original.png';

export default function Dashboard() {
    const [abaAtiva, setAbaAtiva] = useState('dashboard');
    const [filtroCurso, setFiltroCurso] = useState('todos');
    const [filtroAno, setFiltroAno] = useState('todos');
    const [filtroTurno, setFiltroTurno] = useState('todos');
    const [modalDenuncia, setModalDenuncia] = useState(null); // Para visualização de denúncia

    // ── ESTADO REAL E DINÂMICO DE DENÚNCIAS ──
    const [denuncias, setDenuncias] = useState([
        { id: '#DEN042', tipo: 'Bullying', data: '19/05/2026', status: 'Pendente', prioridade: 'Alta', curso: 'tads', relato: 'Ocorrência de intimidação sistemática no corredor do bloco acadêmico.' },
        { id: '#DEN041', tipo: 'Problema Estrutural', data: '18/05/2026', status: 'Em Análise', prioridade: 'Média', curso: 'informatica', relato: 'Ar condicionado do laboratório 3 com vazamento constante.' },
        { id: '#DEN040', tipo: 'Assédio', data: '18/05/2026', status: 'Pendente', prioridade: 'Alta', curso: 'administracao', relato: 'Relato confidencial enviado via aplicativo estudantil.' },
        { id: '#DEN039', tipo: 'Discriminação', data: '16/05/2026', status: 'Resolvido', prioridade: 'Alta', curso: 'quimica', relato: 'Caso tratado em conjunto com a comissão pedagógica do campus.' }
    ]);

    // ── ESTADO REAL DE RESPOSTAS DIÁRIAS (MAPA DE HUMOR) ──
    const [respostasHumor] = useState([
        { id: 1, data: '19/05/2026', hora: '10:15', curso: 'tads', turno: 'Noturno', ano: '3º Ano', humor: '😄 Ótimo', denuncia: 'Não' },
        { id: 2, data: '19/05/2026', hora: '09:45', curso: 'informatica', turno: 'Matutino', ano: '1º Ano', humor: '😔 Péssimo', denuncia: 'Sim (Bullying)' },
        { id: 3, data: '18/05/2026', hora: '16:20', curso: 'tpq', turno: 'Vespertino', ano: '2º Ano', humor: '😐 Neutro', denuncia: 'Não' },
        { id: 4, data: '18/05/2026', hora: '11:00', curso: 'administracao', turno: 'Matutino', ano: '4º Ano', humor: '🙂 Bem', denuncia: 'Não' },
        { id: 5, data: '17/05/2026', hora: '19:30', curso: 'tads', turno: 'Noturno', ano: '1º Ano', humor: '😕 Ruim', denuncia: 'Não' }
    ]);

    // Função para alterar dinamicamente o status de uma denúncia (Ação real do Admin)
    const alternarStatusDenuncia = (id) => {
        setDenuncias(prev => prev.map(item => {
            if (item.id === id) {
                const proximosStatus = { 'Pendente': 'Em Análise', 'Em Análise': 'Resolvido', 'Resolvido': 'Pendente' };
                return { ...item, status: proximosStatus[item.status] };
            }
            return item;
        }));
    };

    // Filtragem ativa de dados
    const denunciasFiltradas = filtroCurso === 'todos'
        ? denuncias
        : denuncias.filter(d => d.curso === filtroCurso);

    let respostasFiltradas = respostasHumor;
    if (filtroCurso !== 'todos') respostasFiltradas = respostasFiltradas.filter(r => r.curso === filtroCurso);
    if (filtroAno !== 'todos') respostasFiltradas = respostasFiltradas.filter(r => r.ano === filtroAno);
    if (filtroTurno !== 'todos') respostasFiltradas = respostasFiltradas.filter(r => r.turno === filtroTurno);

    return (
        <div className="recipiente-painel">

            {/* ── BARRA LATERAL (SIDEBAR) ── */}
            <aside className="barra-lateral">
                <div>
                    <div className="cabecalho-logo">
                        <img src={logoCampus} alt="Logo IFRN Campus Nova Cruz" />
                    </div>

                    <nav className="menu-navegacao">
                        <button
                            onClick={() => setAbaAtiva('dashboard')}
                            className={`item-menu ${abaAtiva === 'dashboard' ? 'item-menu-ativo' : ''}`}
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </button>
                        <button
                            onClick={() => setAbaAtiva('respostas')}
                            className={`item-menu ${abaAtiva === 'respostas' ? 'item-menu-ativo' : ''}`}
                        >
                            <MessageSquare size={20} />
                            <span>Respostas</span>
                        </button>
                        <button
                            onClick={() => setAbaAtiva('estatisticas')}
                            className={`item-menu ${abaAtiva === 'estatisticas' ? 'item-menu-ativo' : ''}`}
                        >
                            <BarChart2 size={20} />
                            <span>Estatísticas</span>
                        </button>
                        <button
                            onClick={() => setAbaAtiva('denuncias')}
                            className={`item-menu ${abaAtiva === 'denuncias' ? 'item-menu-ativo' : ''}`}
                        >
                            <AlertTriangle size={20} />
                            <span>Denúncias</span>
                        </button>
                    </nav>
                </div>

                <div className="rodape-lateral">
                    <button
                        onClick={() => setAbaAtiva('configuracoes')}
                        className={`item-menu ${abaAtiva === 'configuracoes' ? 'item-menu-ativo' : ''}`}
                    >
                        <Settings size={20} />
                        <span>Configurações</span>
                    </button>
                </div>
            </aside>

            {/* ── ÁREA PRINCIPAL DE CONTEÚDO ── */}
            <div className="conteudo-principal">

                <header className="cabecalho-painel">
                    <h2 className="titulo-cabecalho">Gestão do Bem-Estar Estudantil</h2>

                    <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter size={16} className="text-gray-400" />
                                <select value={filtroCurso} onChange={e => setFiltroCurso(e.target.value)} className="seletor-filtro">
                                    <option value="todos">Todos os Cursos</option>
                                    <option value="tads">TADS</option>
                                    <option value="informatica">Informática</option>
                                    <option value="administracao">Administração</option>
                                    <option value="quimica">Química</option>
                                    <option value="tpq">TPQ</option>
                                </select>
                                <select value={filtroAno} onChange={e => setFiltroAno(e.target.value)} className="seletor-filtro">
                                    <option value="todos">Todos os Anos</option>
                                    <option value="1º Ano">1º Ano</option>
                                    <option value="2º Ano">2º Ano</option>
                                    <option value="3º Ano">3º Ano</option>
                                    <option value="4º Ano">4º Ano</option>
                                </select>
                                <select value={filtroTurno} onChange={e => setFiltroTurno(e.target.value)} className="seletor-filtro">
                                    <option value="todos">Todos os Turnos</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Noturno">Noturno</option>
                                </select>
                            </div>

                        <div className="botao-acao">
                            <Bell size={22} /><div className="bolinha-notificacao"></div>
                        </div>
                    </div>
                </header>

                <main className="area-rolavel">

                    {/* ── ABA 1: DASHBOARD (VISÃO GERAL) ── */}
                    {abaAtiva === 'dashboard' && (
                        <div>
                            <div className="area-boas-vindas">
                                <h1 className="titulo-boas-vindas">Visão Geral</h1>
                                <p className="subtitulo-boas-vindas">Bem-vindo ao painel corporativo e pedagógico do Campus Nova Cruz.</p>
                                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                                    <p className="text-sm text-blue-900 font-medium">
                                        Este painel apresenta um resumo dinâmico do bem-estar estudantil, denúncias registradas e engajamento por curso, ano e turno. Utilize os filtros acima para refinar a análise e obter insights detalhados sobre o perfil dos estudantes.
                                    </p>
                                </div>
                            </div>

                            <div className="grid-metricas">
                                <div className="cartao-metrica">
                                    <div className="cabecalho-metrica">
                                        <span className="titulo-metrica">Acolhimentos Feitos</span>
                                        <div className="icone-metrica icone-verde-bg"><MessageSquare size={24} /></div>
                                    </div>
                                    <p className="valor-metrica texto-verde">{respostasFiltradas.length}</p>
                                    <div className="rodape-metrica rodape-positivo"><TrendingUp size={16} /><span>Atualizado em tempo real</span></div>
                                </div>

                                <div className="cartao-metrica">
                                    <div className="detalhe-borda borda-vermelha"></div>
                                    <div className="cabecalho-metrica">
                                        <span className="titulo-metrica">Denúncias Ativas</span>
                                        <div className="icone-metrica icone-vermelho-bg"><AlertTriangle size={24} /></div>
                                    </div>
                                    <p className="valor-metrica texto-vermelho">{denunciasFiltradas.filter(d => d.status !== 'Resolvido').length}</p>
                                    <div className="rodape-metrica rodape-alerta"><span>Ações imediatas necessárias</span></div>
                                </div>

                                <div className="cartao-metrica">
                                    <div className="cabecalho-metrica">
                                        <span className="titulo-metrica">Índice Geral Estudantil</span>
                                        <div className="icone-metrica icone-azul-bg"><Smile size={24} /></div>
                                    </div>
                                    <p className="valor-metrica texto-azul">78%</p>
                                    <div className="barra-progresso-fundo"><div className="barra-progresso-preenchimento-total"></div></div>
                                </div>
                            </div>

                            <div className="grid-conteudo">
                                {/* Gráfico Vertical Moderno */}
                                <div className="secao-bloco bloco-largo flex flex-col items-center">
                                    <h3 className="titulo-secao mb-4">Mapa de Humor da Semana</h3>
                                    <div className="mb-2 text-gray-700 text-sm text-center max-w-2xl">
                                        Este gráfico mostra a distribuição dos estados emocionais relatados pelos estudantes ao longo da semana, considerando os filtros de curso, ano e turno. Cada barra representa o percentual de respostas para cada estado de humor.
                                    </div>
                                    <div className="relative w-full max-w-2xl flex items-end gap-6 h-64 mb-6 border-l border-b border-gray-200 pl-8 pb-6">
                                        {/* Eixo Y */}
                                        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full -ml-8 text-xs text-gray-400">
                                            <span>100</span>
                                            <span>75</span>
                                            <span>50</span>
                                            <span>25</span>
                                            <span>0</span>
                                        </div>
                                        {/* Barras */}
                                        {respostasFiltradas.slice(0, 5).map((r, idx) => {
                                            const humorMap = { '😄 Ótimo': 90, '🙂 Bem': 70, '😐 Neutro': 50, '😕 Ruim': 30, '😔 Péssimo': 15 };
                                            const corMap = { '😄 Ótimo': 'bg-green-500', '🙂 Bem': 'bg-blue-500', '😐 Neutro': 'bg-gray-400', '😕 Ruim': 'bg-yellow-400', '😔 Péssimo': 'bg-red-500' };
                                            const altura = humorMap[r.humor] || 30;
                                            return (
                                                <div key={r.id} className="flex flex-col items-center w-16">
                                                    <div className="flex flex-col justify-end h-56 w-full">
                                                        <div
                                                            className={`rounded-t-lg w-full ${corMap[r.humor] || 'bg-gray-300'} shadow-md transition-all duration-700`}
                                                            style={{ height: `${altura}%`, minHeight: 10 }}
                                                        >
                                                            <span className="block text-center text-xs text-white font-bold pt-1">{altura}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs mt-2 font-bold">{r.humor.split(' ')[1]}</span>
                                                    <span className="text-xs text-gray-400">{r.data.split('/')[0]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Legenda */}
                                    <div className="flex gap-4 mt-2">
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>Ótimo</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>Bem</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-gray-400 rounded-full"></span>Neutro</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-yellow-400 rounded-full"></span>Ruim</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>Péssimo</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 text-center max-w-2xl">
                                        <b>Dica:</b> Barreiras mais altas indicam maior frequência daquele estado emocional entre os estudantes filtrados.
                                    </div>
                                </div>

                                <div className="secao-bloco">
                                    <h3 className="titulo-secao">Status de Alertas</h3>
                                    <div className="mb-2 text-gray-700 text-xs">
                                        Acompanhe aqui alertas institucionais e status de suporte psicológico e pedagógico em andamento.
                                    </div>
                                    <div className="lista-itens">
                                        <div className="cartao-item">
                                            <div>
                                                <p className="font-bold text-gray-900">Suporte Psicológico</p>
                                                <p className="text-xs text-gray-500">Apoio contínuo NAPNE / COAES</p>
                                            </div>
                                            <span className="tag-curso bg-green-100 text-green-800">Ativo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {abaAtiva === 'respostas' && (
                        <div>
                            {/* Cabeçalho */}
                            <div className="cabecalho-respostas">
                                <div>
                                    <h2 className="titulo-respostas">Respostas dos Alunos</h2>
                                    <p className="subtitulo-respostas">
                                        Histórico detalhado de feedbacks emocionais recebidos dos estudantes do Campus Nova Cruz.
                                    </p>
                                </div>
                                <button className="botao-exportar">
                                    <i className="ti ti-download" aria-hidden="true"></i> Exportar Dados
                                </button>
                            </div>

                            {/* Filtros */}
                            <div className="barra-filtros">
                                <div className="grupo-filtro">
                                    <label className="rotulo-filtro">Curso</label>
                                    <select className="seletor-filtro-respostas">
                                        <option>Todos os Cursos</option>
                                    </select>
                                </div>
                                <div className="grupo-filtro">
                                    <label className="rotulo-filtro">Turno</label>
                                    <select className="seletor-filtro-respostas">
                                        <option>Todos os Turnos</option>
                                    </select>
                                </div>
                                <div className="grupo-filtro">
                                    <label className="rotulo-filtro">Data</label>
                                    <input type="date" className="campo-data-filtro" />
                                </div>
                                <button className="botao-limpar-filtros">
                                    <i className="ti ti-adjustments-horizontal" aria-hidden="true"></i> Limpar Filtros
                                </button>
                            </div>

                            {/* Tabela */}
                            <div className="container-tabela-respostas">
                                <table className="tabela-respostas">
                                    <thead>
                                    <tr>
                                        <th className="th-respostas">Data &amp; Hora</th>
                                        <th className="th-respostas">Estudante (Gênero)</th>
                                        <th className="th-respostas">Curso &amp; Ano</th>
                                        <th className="th-respostas">Turno</th>
                                        <th className="th-respostas">Estado Emocional</th>
                                        <th className="th-respostas">Ações</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {respostasFiltradas.map(r => (
                                        <tr key={r.id} className="linha-respostas">

                                            {/* Data & Hora */}
                                            <td className="td-respostas">
                                                <span className="data-principal">{r.data}</span>
                                                <span className="hora-secundaria">{r.hora}</span>
                                            </td>

                                            {/* Estudante (Gênero) */}
                                            <td className="td-respostas">
                <span className="celula-genero">
                  <i className="ti ti-user" aria-hidden="true"></i>
                    {r.genero}
                </span>
                                            </td>

                                            {/* Curso & Ano */}
                                            <td className="td-respostas">
                <span className={`badge-curso badge-curso-${r.curso.split('-')[0].trim().toLowerCase()}`}>
                  {r.curso}
                </span>
                                            </td>

                                            {/* Turno */}
                                            <td className="td-respostas">{r.turno}</td>

                                            {/* Estado Emocional */}
                                            <td className="td-respostas">
                <span className={`emblema-humor humor-${r.humor.toLowerCase().replace(/\s+/g, '-')}`}>
                  {r.emoji} {r.humor}
                </span>
                                            </td>

                                            {/* Ações */}
                                            <td className="td-respostas">
                                                <button className="botao-ver" onClick={() => handleVerResposta(r)}>
                                                    <i className="ti ti-eye" aria-hidden="true"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                {/* Paginação */}
                                <div className="rodape-paginacao">
        <span className="info-paginacao">
          Mostrando <strong>1-5</strong> de <strong>128</strong> registros
        </span>
                                    <div className="controles-paginacao">
                                        <button className="btn-pagina btn-seta">‹</button>
                                        <button className="btn-pagina-ativo">1</button>
                                        <button className="btn-pagina">2</button>
                                        <button className="btn-pagina">3</button>
                                        <span className="reticencias-pagina">...</span>
                                        <button className="btn-pagina">26</button>
                                        <button className="btn-pagina btn-seta">›</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* ── ABA 3: ESTATÍSTICAS (KPIs ANALÍTICOS) ── */}
                    {abaAtiva === 'estatisticas' && (
                        <div>
                            <h3 className="titulo-secao">Métricas Analíticas por Curso</h3>
                            <div className="mb-2 text-gray-700 text-sm max-w-2xl">
                                Acompanhe o desempenho e engajamento dos cursos ao longo do tempo. Os dados são atualizados conforme os registros dos estudantes.
                            </div>
                            <div className="grid-conteudo">
                                {/* Gráfico de Barras Verticais por Curso */}
                                <div className="secao-bloco bloco-largo flex flex-col items-center">
                                    <h4 className="font-bold text-gray-800 mb-4">Volume de Engajamento e Participação</h4>
                                    <div className="mb-2 text-gray-700 text-sm text-center max-w-2xl">
                                        Este gráfico compara o percentual de participação dos estudantes em cada curso, considerando os filtros de ano e turno. Use as legendas para identificar cada curso.
                                    </div>
                                    <div className="relative w-full max-w-2xl flex items-end gap-8 h-64 mb-6 border-l border-b border-gray-200 pl-8 pb-6">
                                        {/* Eixo Y */}
                                        <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full -ml-8 text-xs text-gray-400">
                                            <span>100%</span>
                                            <span>75%</span>
                                            <span>50%</span>
                                            <span>25%</span>
                                            <span>0%</span>
                                        </div>
                                        {/* Barras por curso */}
                                                {[
                                                    { nome: 'TADS', cor: 'bg-green-500', key: 'tads' },
                                                    { nome: 'Informática', cor: 'bg-blue-500', key: 'informatica' },
                                                    { nome: 'Administração', cor: 'bg-yellow-500', key: 'administracao' },
                                                    { nome: 'Química', cor: 'bg-purple-500', key: 'quimica' },
                                                    { nome: 'TPQ', cor: 'bg-pink-500', key: 'tpq' },
                                                ].map((curso, idx) => {
                                                    // Calcula % de respostas desse curso no filtro
                                                    const total = respostasFiltradas.length;
                                                    const doCurso = respostasFiltradas.filter(r => r.curso === curso.key).length;
                                                    const valor = total > 0 ? Math.round((doCurso / total) * 100) : 0;
                                                    return (
                                                        <div key={curso.nome} className="flex flex-col items-center w-20">
                                                            <div className="flex flex-col justify-end h-56 w-full">
                                                                <div
                                                                    className={`rounded-t-lg w-full ${curso.cor} shadow-md transition-all duration-700`}
                                                                    style={{ height: `${valor}%`, minHeight: 10 }}
                                                                >
                                                                    <span className="block text-center text-xs text-white font-bold pt-1">{valor}%</span>
                                                                </div>
                                                            </div>
                                                            <span className="text-xs mt-2 font-bold uppercase">{curso.nome}</span>
                                                        </div>
                                                    );
                                                })}
                                    </div>
                                    {/* Legenda */}
                                    <div className="flex gap-4 mt-2">
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>TADS</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>Informática</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>Administração</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span>Química</span>
                                        <span className="flex items-center gap-1 text-xs"><span className="inline-block w-3 h-3 bg-pink-500 rounded-full"></span>TPQ</span>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 text-center max-w-2xl">
                                        <b>Como ler:</b> Cada barra mostra a proporção de registros de cada curso em relação ao total filtrado. Barreiras mais altas indicam maior engajamento ou participação dos estudantes daquele curso.
                                    </div>
                                </div>

                                <div className="secao-bloco">
                                    <h4 className="font-bold text-gray-800 mb-2">Resumo da Amostra</h4>
                                    <p className="text-sm text-gray-500 mb-4">Análise total baseada em dados computados da semana corrente.</p>
                                    <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                                        <div className="flex justify-between text-sm font-medium"><span>Média Emocional:</span><span className="font-bold text-green-600">Estável e Positiva</span></div>
                                        <div className="flex justify-between text-sm font-medium"><span>Pico de Envio:</span><span className="font-bold text-gray-800">Quinta-feira (Noturno)</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── ABA 4: DENÚNCIAS (PAINEL INTERATIVO E OPERACIONAL) ── */}
                    {abaAtiva === 'denuncias' && (
                        <div>
                            <h3 className="titulo-secao mb-6">Gerenciamento de Ocorrências e Denúncias</h3>
                            <div className="container-tabela overflow-x-auto">
                                <table className="tabela-dados min-w-full">
                                    <thead className="cabecalho-tabela">
                                        <tr>
                                            <th className="celula-cabecalho">Protocolo</th>
                                            <th className="celula-cabecalho">Categoria</th>
                                            <th className="celula-cabecalho">Curso</th>
                                            <th className="celula-cabecalho">Relato Detalhado</th>
                                            <th className="celula-cabecalho">Status</th>
                                            <th className="celula-cabecalho text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {denunciasFiltradas.map(d => (
                                            <tr key={d.id} className="linha-tabela hover:bg-gray-50 transition">
                                                <td className="celula-tabela font-bold text-gray-900 whitespace-nowrap">{d.id}</td>
                                                <td className="celula-tabela font-semibold text-red-600 whitespace-nowrap">{d.tipo}</td>
                                                <td className="celula-tabela uppercase font-bold whitespace-nowrap">{d.curso}</td>
                                                <td className="celula-tabela text-gray-500 max-w-xs truncate">{d.relato}</td>
                                                <td className="celula-tabela">
                                                    <span className={`badge ${
                                                        d.status === 'Pendente' ? 'badge-pendente' : d.status === 'Em Análise' ? 'badge-analise' : 'badge-concluido'
                                                    }`}>
                                                        {d.status}
                                                    </span>
                                                </td>
                                                <td className="celula-tabela text-center flex flex-col gap-2 items-center">
                                                    <button
                                                        onClick={() => alternarStatusDenuncia(d.id)}
                                                        className="p-2 hover:bg-gray-200 text-gray-600 rounded-lg transition-all inline-flex items-center gap-1 text-xs font-bold border border-gray-300 bg-white cursor-pointer mb-1"
                                                    >
                                                        <RefreshCw size={14} /> Atualizar Status
                                                    </button>
                                                    <button
                                                        onClick={() => setModalDenuncia(d)}
                                                        className="p-2 hover:bg-blue-100 text-blue-700 rounded-lg transition-all inline-flex items-center gap-1 text-xs font-bold border border-blue-200 bg-white cursor-pointer"
                                                    >
                                                        Visualizar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Modal de Visualização de Denúncia */}
                            {modalDenuncia && (
                                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
                                        <button onClick={() => setModalDenuncia(null)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold">×</button>
                                        <h4 className="text-lg font-bold mb-4">Detalhes da Denúncia</h4>
                                        <div className="mb-2"><span className="font-bold">Protocolo:</span> {modalDenuncia.id}</div>
                                        <div className="mb-2"><span className="font-bold">Categoria:</span> {modalDenuncia.tipo}</div>
                                        <div className="mb-2"><span className="font-bold">Curso:</span> {modalDenuncia.curso}</div>
                                        <div className="mb-2"><span className="font-bold">Data:</span> {modalDenuncia.data}</div>
                                        <div className="mb-2"><span className="font-bold">Status:</span> <span className={`badge ${modalDenuncia.status === 'Pendente' ? 'badge-pendente' : modalDenuncia.status === 'Em Análise' ? 'badge-analise' : 'badge-concluido'}`}>{modalDenuncia.status}</span></div>
                                        <div className="mb-2"><span className="font-bold">Prioridade:</span> {modalDenuncia.prioridade}</div>
                                        <div className="mb-2"><span className="font-bold">Relato:</span> <span className="block text-gray-700 mt-1">{modalDenuncia.relato}</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── ABA 5: CONFIGURAÇÕES (FORMULÁRIO DE GESTÃO) ── */}
                    {abaAtiva === 'configuracoes' && (
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Parâmetros do Escuta IF</h3>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Configurações salvas com sucesso!'); }} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Identificação do Campus</label>
                                    <input type="text" defaultValue="IFRN - Campus Nova Cruz" className="campo-formulario" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">E-mail de Notificação COAES / Equipe Pedagógica</label>
                                    <input type="email" defaultValue="coaes.nc@ifrn.edu.br" className="campo-formulario" />
                                </div>
                                <button type="submit" className="botao-salvar self-start">Salvar Alterações</button>
                            </form>
                        </div>
                    )}

                </main>

                {/* ── RODAPÉ INSTITUCIONAL ── */}
                <footer className="rodape-painel">
                    <p>© {new Date().getFullYear()} IFRN Campus Nova Cruz - Todos os direitos reservados.</p>
                    <div className="links-rodape">
                        <span className="link-rodape">Suporte Técnico</span>
                        <span className="link-rodape">Política de Privacidade</span>
                        <span className="link-rodape">Documentação</span>
                    </div>
                </footer>

            </div>
        </div>
    );
}