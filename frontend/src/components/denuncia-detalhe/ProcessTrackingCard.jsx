import { Check, Circle, Info } from 'lucide-react'
import {
  PROCESS_STATUS_LABELS,
  PROCESS_STATUS_MESSAGES,
  PROCESS_STATUS_ORDER,
} from '../../mocks/detalheDenunciaMock'

function StepMarker({ isCompleted, isActive }) {
  if (isCompleted) {
    return (
      <span className="flex size-10 items-center justify-center rounded-full bg-[var(--primary)] text-white">
        <Check className="size-5" />
      </span>
    )
  }

  if (isActive) {
    return (
      <span className="flex size-10 items-center justify-center rounded-full border-4 border-[#86f8c9] bg-[var(--primary)] text-white">
        <Circle className="size-3 fill-white text-white" />
      </span>
    )
  }

  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-[#e4e2de] text-[#9aa09b]">
      <Circle className="size-4" />
    </span>
  )
}

export default function ProcessTrackingCard({ selectedStatus, onStatusChange, onConfirm }) {
  const resolvedActiveIndex = PROCESS_STATUS_ORDER.indexOf(selectedStatus)
  const activeIndex = resolvedActiveIndex >= 0 ? resolvedActiveIndex : 0
  const progressPercent = activeIndex <= 0 ? 0 : (activeIndex / (PROCESS_STATUS_ORDER.length - 1)) * 100
  const currentStatus = PROCESS_STATUS_ORDER[activeIndex]
  const message = PROCESS_STATUS_MESSAGES[currentStatus] ?? ''

  return (
    <section className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <header className="space-y-1">
          <h3 className="text-xl font-semibold leading-7 text-[var(--color-heading)]">
            Acompanhamento do Processo
          </h3>
          <p className="text-sm text-[var(--color-text)]">Selecione uma fase para atualizar o status da denúncia.</p>
        </header>

        <div className="relative">
          <span className="absolute left-0 right-0 top-5 h-[2px] bg-[#e4e2de]" aria-hidden="true" />
          <span
            className="absolute left-0 top-5 h-[2px] bg-[var(--primary)] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-4 gap-2">
            {PROCESS_STATUS_ORDER.map((statusId, index) => {
              const isCompleted = index < activeIndex
              const isActive = index === activeIndex

              return (
                <button
                  key={statusId}
                  type="button"
                  onClick={() => onStatusChange(statusId)}
                  className="flex flex-col items-center gap-2"
                >
                  <StepMarker isCompleted={isCompleted} isActive={isActive} />
                  <span
                    className={`text-center text-xs font-semibold ${
                      isActive || isCompleted ? 'text-[var(--primary)]' : 'text-[var(--color-text)]'
                    }`}
                  >
                    {PROCESS_STATUS_LABELS[statusId]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(0,133,96,0.2)] bg-[rgba(0,133,96,0.08)] p-4">
          <div className="flex items-start gap-2 text-sm text-[var(--color-heading)]">
            <Info className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
            <p>{message}</p>
          </div>
          <button
            type="button"
            onClick={onConfirm}
            className="mt-4 w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Confirmar Alteração
          </button>
        </div>
      </div>
    </section>
  )
}
