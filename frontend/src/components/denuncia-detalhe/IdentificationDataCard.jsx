import { Shield } from 'lucide-react'

export default function IdentificationDataCard({ isAnonymous }) {
  return (
    <aside className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="size-5 text-[#855400]" />
          <h3 className="text-xl font-semibold text-[var(--color-heading)]">Dados de Identificação</h3>
        </div>

        {isAnonymous ? (
          <div className="rounded-xl border border-[rgba(252,170,51,0.3)] bg-[rgba(252,170,51,0.2)] p-5 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#855400] text-white">
              <Shield className="size-5" />
            </div>
            <p className="text-sm font-bold text-[var(--color-heading)]">Denúncia Anônima</p>
            <p className="mt-2 text-sm text-[var(--color-text)]">
              O usuário optou por não fornecer dados de identificação. A comunicação será feita apenas através do
              protocolo gerado.
            </p>
          </div>
        ) : null}
      </div>
    </aside>
  )
}
