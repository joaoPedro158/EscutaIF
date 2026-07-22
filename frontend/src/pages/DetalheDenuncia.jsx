import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react'
import MobileLayout from '../layout/MobileLayout'
import DenunciaMainInfoCard from '../components/denuncia-detalhe/DenunciaMainInfoCard'
import DenunciaDetailsCard from '../components/denuncia-detalhe/DenunciaDetailsCard'
import ProcessTrackingCard from '../components/denuncia-detalhe/ProcessTrackingCard'
import IdentificationDataCard from '../components/denuncia-detalhe/IdentificationDataCard'
import { PROCESS_STATUS_LABELS } from '../mocks/detalheDenunciaMock'
import { getDashboardDenunciaById } from '../services/Dashboard'

function formatDate(dateString) {
  if (!dateString) return 'Não informada'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

export default function DetalheDenuncia() {
  const { id: paramId } = useParams()
  const [searchParams] = useSearchParams()
  const denunciaId = paramId || searchParams.get('id') || '5'

  const [denuncia, setDenuncia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('PENDENTE')
  const [confirmedStatus, setConfirmedStatus] = useState('PENDENTE')

  const fetchDenuncia = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getDashboardDenunciaById(denunciaId)
      setDenuncia(data)
      if (data && data.status) {
        setSelectedStatus(data.status)
        setConfirmedStatus(data.status)
      }
    } catch (err) {
      console.error('Erro ao carregar detalhes da denúncia:', err)
      setError(err.mensagem || 'Não foi possível carregar os detalhes da denúncia.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (denunciaId) {
      fetchDenuncia()
    }
  }, [denunciaId])

  const handleConfirmStatus = () => {
    setConfirmedStatus(selectedStatus)
  }

  const isAnonymous = !denuncia?.nome && !denuncia?.email && !denuncia?.telefone

  return (
    <MobileLayout>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
            >
              <ArrowLeft className="size-4" /> Voltar ao Dashboard
            </Link>
            <h1 className="text-[26px] font-bold leading-8 tracking-[-0.52px] text-[var(--primary)]">
              Detalhes da Denúncia #{denunciaId}
            </h1>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-10 animate-spin text-[var(--primary)]" />
            <p className="mt-4 text-base text-[var(--color-text)]">Carregando detalhes da denúncia...</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800">
            <AlertTriangle className="mx-auto size-10 text-red-500" />
            <p className="mt-2 text-base font-semibold">{error}</p>
            <button
              type="button"
              onClick={fetchDenuncia}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {!loading && !error && denuncia && (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <DenunciaMainInfoCard
                tipoDenuncia={denuncia.tipoDenuncia}
                registradoEm={formatDate(denuncia.criado_em || denuncia.dataIncidente)}
              />

              <DenunciaDetailsCard
                descricao={denuncia.descricao}
                dataIncidente={formatDate(denuncia.dataIncidente)}
                local={denuncia.local || 'Não informado'}
                pessoaAfetada={denuncia.pessoaAfetada || 'Não informada'}
              />

              <ProcessTrackingCard
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onConfirm={handleConfirmStatus}
              />

              <p className="text-sm text-[var(--color-text)]">
                Status confirmado: <strong>{PROCESS_STATUS_LABELS[confirmedStatus] || confirmedStatus}</strong>
              </p>
            </div>

            <div>
              <IdentificationDataCard
                isAnonymous={isAnonymous}
                nome={denuncia.nome}
                email={denuncia.email}
                telefone={denuncia.telefone}
              />
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

