import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Loader2, ExternalLink } from 'lucide-react'
import { getDashboardRelatorio } from '../services/Dashboard'

const getTipoDenunciaBadge = (tipo) => {
  const styles = {
    'DISCRIMINACAO': { label: 'Discriminação', className: 'bg-purple-100 text-purple-800 border-purple-200' },
    'CONDUTA_INAPROPRIADA': { label: 'Conduta Inapropriada', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    'VIOLENCIA': { label: 'Violência', className: 'bg-red-100 text-red-800 border-red-200' },
    'ASSEDIO': { label: 'Assédio', className: 'bg-rose-100 text-rose-800 border-rose-200' },
    'OUTRO': { label: 'Outro', className: 'bg-slate-100 text-slate-800 border-slate-200' }
  }
  const config = styles[tipo] || { label: tipo, className: 'bg-gray-100 text-gray-800 border-gray-200' }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
      {config.label}
    </span>
  )
}

const getStatusBadge = (status) => {
  const styles = {
    'CONCLUIDA': { label: 'Concluída', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    'RESOLVIDO': { label: 'Resolvido', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    'EM_ANALISE': { label: 'Em Análise', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    'PENDENTE': { label: 'Pendente', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    'ARQUIVADA': { label: 'Arquivada', className: 'bg-slate-100 text-slate-800 border-slate-200' }
  }
  const config = styles[status] || { label: status, className: 'bg-gray-100 text-gray-800 border-gray-200' }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  )
}


const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export default function ReportsTable() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [reportsData, setReportsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRelatorios = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getDashboardRelatorio(page)
        setReportsData(data)
      } catch (err) {
        console.error('Erro ao carregar relatórios:', err)
        setError('Erro ao carregar relatórios. Tente novamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchRelatorios()
  }, [page])

  const reports = reportsData?.content || []
  const totalPages = reportsData?.totalPages || 0
  const isFirst = reportsData?.first ?? (page === 0)
  const isLast = reportsData?.last ?? (totalPages > 0 ? page >= totalPages - 1 : true)
  const totalElements = reportsData?.totalElements || 0

  const handlePrevPage = () => {
    if (!isFirst && page > 0) {
      setPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (!isLast) {
      setPage(prev => prev + 1)
    }
  }

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex)
  }

  return (
    <div className="rounded-2xl bg-white p-6 border border-[#f0eee9] shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h3 className="text-lg font-semibold text-[#1b1c19]">Relatórios</h3>
        {totalElements > 0 && (
          <span className="text-xs font-medium text-[#3d4943] bg-[#fbf9f4] px-3 py-1 rounded-full border border-[#f0eee9]">
            Total: {totalElements} registros
          </span>
        )}
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="overflow-x-auto relative min-h-[250px]">
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
            <Loader2 className="w-8 h-8 text-[#00694c] animate-spin" />
          </div>
        )}

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#f0eee9] text-[#3d4943] bg-[#fbf9f4]">
              <th className="py-3 px-4 font-semibold">Nome</th>
              <th className="py-3 px-4 font-semibold">Tipo da Denúncia</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Data do Incidente</th>
              <th className="py-3 px-4 font-semibold">Data de Criação</th>
              <th className="py-3 px-4 font-semibold text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {!loading && reports.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-[#3d4943]">
                  Nenhum relatório encontrado.
                </td>
              </tr>
            ) : (
              reports.map((report, idx) => (
                <tr
                  key={idx}
                  onClick={() => report.id && navigate(`/denuncia/detalhe/${report.id}`)}
                  className="border-b border-[#f0eee9] hover:bg-[#fbf9f4] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 font-medium text-[#1b1c19]">{report.nome || '-'}</td>
                  <td className="py-3 px-4">{getTipoDenunciaBadge(report.tipoDenuncia)}</td>
                  <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                  <td className="py-3 px-4 text-[#3d4943]">{formatDate(report.dataIncidente)}</td>
                  <td className="py-3 px-4 text-[#3d4943]">{formatDate(report.criado_em)}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (report.id) navigate(`/denuncia/detalhe/${report.id}`)
                      }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#00694c] hover:underline"
                    >
                      <span>Ver</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[#f0eee9]">
          <span className="text-xs text-[#3d4943]">
            Página <span className="font-semibold text-[#1b1c19]">{page + 1}</span> de{' '}
            <span className="font-semibold text-[#1b1c19]">{totalPages}</span>
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevPage}
              disabled={isFirst || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#f0eee9] text-xs font-medium text-[#3d4943] hover:bg-[#fbf9f4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i).map((pageIdx) => {
                if (
                  pageIdx === 0 ||
                  pageIdx === totalPages - 1 ||
                  (pageIdx >= page - 1 && pageIdx <= page + 1)
                ) {
                  return (
                    <button
                      key={pageIdx}
                      onClick={() => handlePageClick(pageIdx)}
                      disabled={loading}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                        pageIdx === page
                          ? 'bg-[#00694c] text-white'
                          : 'text-[#3d4943] hover:bg-[#fbf9f4] border border-[#f0eee9]'
                      }`}
                    >
                      {pageIdx + 1}
                    </button>
                  )
                } else if (
                  (pageIdx === page - 2 && pageIdx > 0) ||
                  (pageIdx === page + 2 && pageIdx < totalPages - 1)
                ) {
                  return (
                    <span key={pageIdx} className="px-1 text-xs text-[#3d4943]">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            <button
              onClick={handleNextPage}
              disabled={isLast || loading}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#f0eee9] text-xs font-medium text-[#3d4943] hover:bg-[#fbf9f4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próximo
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

