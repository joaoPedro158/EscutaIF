import { AlertCircle } from 'lucide-react'

export default function DenunciaMainInfoCard({ tipoDenuncia, registradoEm }) {
  return (
    <section className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-soft-border)] pb-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--color-soft-warm)]">
            <AlertCircle className="size-6 text-[#c56f00]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-heading)]">{tipoDenuncia}</h2>
            <p className="mt-1 text-base text-[var(--color-text)]">Registrado em {registradoEm}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
