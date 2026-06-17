import { ShieldAlert } from 'lucide-react'

export default function RestrictedAccessBanner({
  title = 'Acesso Restrito',
  description = 'Apenas administradores seniores\npodem cadastrar novos membros da\nequipe gestora.',
  className = '',
}) {
  return (
    <section
      className={`flex w-full flex-col gap-4 rounded-[12px] border border-[#fcaa33] bg-[#ffddb7] p-4 sm:flex-row sm:items-center sm:gap-4 ${className}`}
      role="note"
      aria-label={title}
    >
      <div className="flex shrink-0 items-center justify-center rounded-lg bg-[#fcaa33] p-2">
        <ShieldAlert className="h-5 w-[18px] text-[#6b4200]" aria-hidden="true" />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-sm font-bold leading-4 tracking-[0.01em] text-[#2a1700]">{title}</h2>
        <p className="whitespace-pre-line text-sm leading-5 text-[#653e00]">{description}</p>
      </div>
    </section>
  )
}
