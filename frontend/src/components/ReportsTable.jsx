const mockReports = [
  {
    id: 1,
    course: 'Engenharia de Software',
    category: 'Saúde Mental',
    sentiment: 'Crítico',
    date: '2024-06-15',
    status: 'Pendente'
  },
  {
    id: 2,
    course: 'Análise de Sistemas',
    category: 'Assédio',
    sentiment: 'Moderado',
    date: '2024-06-14',
    status: 'Em Análise'
  },
  {
    id: 3,
    course: 'Gestão de Projetos',
    category: 'Discriminação',
    sentiment: 'Neutro',
    date: '2024-06-13',
    status: 'Resolvido'
  },
  {
    id: 4,
    course: 'Banco de Dados',
    category: 'Financeiro',
    sentiment: 'Positivo',
    date: '2024-06-12',
    status: 'Resolvido'
  },
  {
    id: 5,
    course: 'Desenvolvimento Web',
    category: 'Acadêmico',
    sentiment: 'Neutro',
    date: '2024-06-11',
    status: 'Pendente'
  }
]

const getSentimentColor = (sentiment) => {
  const colors = {
    'Crítico': 'bg-red-100 text-red-800',
    'Moderado': 'bg-yellow-100 text-yellow-800',
    'Neutro': 'bg-blue-100 text-blue-800',
    'Positivo': 'bg-green-100 text-green-800'
  }
  return colors[sentiment] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status) => {
  const colors = {
    'Pendente': 'text-[#fcaa33]',
    'Em Análise': 'text-[#004384]',
    'Resolvido': 'text-[#00694c]'
  }
  return colors[status] || 'text-[#3d4943]'
}

export default function ReportsTable() {
  return (
    <div className="rounded-2xl bg-white p-6 border border-[#f0eee9] overflow-x-auto">
      <h3 className="text-lg font-semibold text-[#1b1c19] mb-6">Últimos Relatórios</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#f0eee9]">
            <th className="text-left py-3 px-4 font-semibold text-[#3d4943]">Curso</th>
            <th className="text-left py-3 px-4 font-semibold text-[#3d4943]">Categoria</th>
            <th className="text-left py-3 px-4 font-semibold text-[#3d4943]">Sentimento</th>
            <th className="text-left py-3 px-4 font-semibold text-[#3d4943]">Data</th>
            <th className="text-left py-3 px-4 font-semibold text-[#3d4943]">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockReports.map((report) => (
            <tr key={report.id} className="border-b border-[#f0eee9] hover:bg-[#fbf9f4]">
              <td className="py-3 px-4 text-[#3d4943]">{report.course}</td>
              <td className="py-3 px-4 text-[#3d4943]">{report.category}</td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(report.sentiment)}`}>
                  {report.sentiment}
                </span>
              </td>
              <td className="py-3 px-4 text-[#3d4943]">{new Date(report.date).toLocaleDateString('pt-BR')}</td>
              <td className={`py-3 px-4 font-medium ${getStatusColor(report.status)}`}>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
