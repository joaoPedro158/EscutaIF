import { CalendarDays, MapPin, UserRound } from 'lucide-react'

function DetailItem({ icon: Icon, title, content }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.7px] text-[var(--color-text)]">
        <Icon className="size-4" />
        <span>{title}</span>
      </div>
      <p className="text-base text-[var(--color-heading)]">{content}</p>
    </div>
  )
}

export default function DenunciaDetailsCard({ descricao, dataIncidente, local, pessoaAfetada }) {
  return (
    <section className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.7px] text-[var(--color-text)]">
            Descrição do ocorrido
          </h3>
          <div className="mt-2 rounded-xl border border-[#e4e2de] bg-[var(--color-surface)] p-5">
            <p className="text-base leading-7 text-[var(--color-heading)]">{descricao}</p>
          </div>
        </div>

        <DetailItem title="Data do incidente" icon={CalendarDays} content={dataIncidente} />
        <DetailItem title="Local" icon={MapPin} content={local} />
        <DetailItem title="Pessoa afetada" icon={UserRound} content={pessoaAfetada} />
      </div>
    </section>
  )
}
