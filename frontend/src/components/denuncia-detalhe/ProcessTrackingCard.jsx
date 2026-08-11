import { Check, Circle, Info, Loader2, Archive, ArrowRight, CheckCircle2 } from 'lucide-react'

const PROCESS_STATUS_ORDER = ['PENDENTE', 'EM_ANALISE', 'CONCLUIDA', 'ARQUIVADA']

const PROCESS_STATUS_LABELS = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em Análise',
  CONCLUIDA: 'Concluída',
  ARQUIVADA: 'Arquivada',
}

const PROCESS_STATUS_MESSAGES = {
  PENDENTE: 'A denúncia foi recebida e aguarda início da análise pela equipe responsável.',
  EM_ANALISE: 'A denúncia está sendo revisada pela comissão de ética acadêmica.',
  CONCLUIDA: 'A apuração foi concluída e as ações institucionais aplicáveis já foram encaminhadas.',
  ARQUIVADA: 'O processo foi arquivado após a conclusão do fluxo de apuração.',
}

const PROCESS_STATUS_COLORS = {
  PENDENTE: {
    label: 'Pendente',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-50',
    hex: '#f59e0b',
    stepBg: 'bg-amber-500',
    ring: 'border-amber-300',
  },
  EM_ANALISE: {
    label: 'Em Análise',
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-50',
    hex: '#3b82f6',
    stepBg: 'bg-blue-500',
    ring: 'border-blue-300',
  },
  CONCLUIDA: {
    label: 'Concluída',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    badgeBg: 'bg-emerald-50',
    hex: '#10b981',
    stepBg: 'bg-emerald-500',
    ring: 'border-emerald-300',
  },
  ARQUIVADA: {
    label: 'Arquivada',
    bg: 'bg-slate-100',
    text: 'text-slate-800',
    border: 'border-slate-200',
    badgeBg: 'bg-slate-50',
    hex: '#64748b',
    stepBg: 'bg-slate-500',
    ring: 'border-slate-300',
  },
}

function StepMarker({ isCompleted, isActive, statusKey }) {
  const colorInfo = PROCESS_STATUS_COLORS[statusKey] || {
    stepBg: 'bg-emerald-600',
    ring: 'border-emerald-300',
  }

  if (isCompleted) {
    return (
      <span className={`flex size-10 items-center justify-center rounded-full text-white shadow-sm transition-all duration-500 ${colorInfo.stepBg}`}>
        <Check className="size-5" />
      </span>
    )
  }

  if (isActive) {
    return (
      <span className={`flex size-10 items-center justify-center rounded-full border-4 ${colorInfo.ring} ${colorInfo.stepBg} text-white shadow-md transition-all duration-500 animate-pulse`}>
        <Circle className="size-3 fill-white text-white" />
      </span>
    )
  }

  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200 transition-all duration-300">
      <Circle className="size-4" />
    </span>
  )
}

export default function ProcessTrackingCard({
  status = 'PENDENTE',
  onUpdateStatus,
  updating = false,
  isAnimating = false,
  updateError = null,
}) {
  const currentStatus = status || 'PENDENTE'
  const activeIndex = Math.max(0, PROCESS_STATUS_ORDER.indexOf(currentStatus))
  const progressPercent = (activeIndex / (PROCESS_STATUS_ORDER.length - 1)) * 100
  const isArchived = currentStatus === 'ARQUIVADA'
  const message = PROCESS_STATUS_MESSAGES[currentStatus] ?? ''
  const statusColor = PROCESS_STATUS_COLORS[currentStatus] || PROCESS_STATUS_COLORS.PENDENTE

  const nextStatusKey = activeIndex < PROCESS_STATUS_ORDER.length - 1 ? PROCESS_STATUS_ORDER[activeIndex + 1] : null
  const nextStatusLabel = nextStatusKey ? PROCESS_STATUS_LABELS[nextStatusKey] : null

  return (
    <section className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)] transition-all">
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold leading-7 text-[var(--color-heading)]">
              Acompanhamento do Processo
            </h3>
            <p className="text-sm text-[var(--color-text)]">
              {isArchived
                ? 'Este processo já foi encerrado e arquivado.'
                : 'Acompanhe e gerencie o fluxo de resolução da denúncia.'}
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
            <span className={`size-2 rounded-full ${statusColor.stepBg}`} />
            {PROCESS_STATUS_LABELS[currentStatus] || currentStatus}
          </span>
        </header>

        {/* Timeline Progress Bar */}
        <div className="relative pt-2 pb-2">
          {/* Background Line */}
          <span className="absolute left-0 right-0 top-7 h-2 rounded-full bg-slate-100" aria-hidden="true" />
          
          {/* Animated Progress Fill Line */}
          <div
            className={`absolute left-0 top-7 h-2 rounded-full transition-all duration-700 ease-in-out ${statusColor.stepBg} ${
              isAnimating ? 'ring-4 ring-emerald-300 animate-pulse' : ''
            }`}
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-4 gap-2">
            {PROCESS_STATUS_ORDER.map((statusId, index) => {
              const isCompleted = index < activeIndex
              const isActive = index === activeIndex
              const itemColor = PROCESS_STATUS_COLORS[statusId] || statusColor

              return (
                <div
                  key={statusId}
                  className="flex flex-col items-center gap-2"
                >
                  <StepMarker isCompleted={isCompleted} isActive={isActive} statusKey={statusId} />
                  <span
                    className={`text-center text-xs font-semibold transition-colors duration-300 ${
                      isActive
                        ? `${itemColor.text} font-bold`
                        : isCompleted
                        ? 'text-slate-700 font-medium'
                        : 'text-slate-400'
                    }`}
                  >
                    {PROCESS_STATUS_LABELS[statusId]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Toast / Notification when progress animates */}
        {isAnimating && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold animate-bounce">
            <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
            <span>Status da denúncia atualizado com sucesso no servidor!</span>
          </div>
        )}

        {/* Error notification */}
        {updateError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {updateError}
          </div>
        )}

        {/* Status Description Box & Update Action */}
        <div className={`rounded-2xl border p-5 transition-all duration-300 ${statusColor.badgeBg} ${statusColor.border}`}>
          <div className="flex items-start gap-3">
            <Info className={`mt-0.5 size-5 shrink-0 ${statusColor.text}`} />
            <div>
              <h4 className={`text-sm font-bold ${statusColor.text}`}>
                Fase Atual: {PROCESS_STATUS_LABELS[currentStatus]}
              </h4>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{message}</p>
            </div>
          </div>

          {/* Opção de atualizar status - DESAPARECE QUANDO ARQUIVADA */}
          {!isArchived ? (
            <div className="mt-5 pt-4 border-t border-slate-200/60">
              <button
                type="button"
                onClick={onUpdateStatus}
                disabled={updating || isAnimating}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all ${statusColor.stepBg} hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {updating ? (
                  <>
                    <Loader2 className="size-4 animate-spin text-white" />
                    <span>Atualizando Status...</span>
                  </>
                ) : (
                  <>
                    <span>Avançar para: {nextStatusLabel}</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Archive className="size-4 text-slate-400" />
              <span>Denúncia arquivada. Não há novas ações de alteração de status disponíveis.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

