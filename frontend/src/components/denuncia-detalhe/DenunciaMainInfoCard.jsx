import { UserX, Scale, ShieldAlert, OctagonAlert, FileText, AlertCircle } from 'lucide-react'

export const TIPO_DENUNCIA_MAP = {
  ASSEDIO: {
    label: 'Assédio',
    Icon: UserX,
    bgColor: 'bg-rose-100',
    textColor: 'text-rose-700',
  },
  DISCRIMINACAO: {
    label: 'Discriminação',
    Icon: Scale,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  VIOLENCIA: {
    label: 'Violência',
    Icon: ShieldAlert,
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  CONDUTA_INAPROPRIADA: {
    label: 'Conduta Inapropriada',
    Icon: OctagonAlert,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  OUTRO: {
    label: 'Outro',
    Icon: FileText,
    bgColor: 'bg-slate-100',
    textColor: 'text-slate-700',
  },
}

export function getTipoDenunciaInfo(tipo) {
  if (!tipo) return { label: 'Não informado', Icon: AlertCircle, bgColor: 'bg-gray-100', textColor: 'text-gray-700' }

  const key = String(tipo).trim().toUpperCase()
  if (TIPO_DENUNCIA_MAP[key]) {
    return TIPO_DENUNCIA_MAP[key]
  }

  if (key.includes('ASSÉDIO') || key.includes('ASSEDIO')) return TIPO_DENUNCIA_MAP.ASSEDIO
  if (key.includes('DISCRIMINA')) return TIPO_DENUNCIA_MAP.DISCRIMINACAO
  if (key.includes('VIOLÊNCIA') || key.includes('VIOLENCIA')) return TIPO_DENUNCIA_MAP.VIOLENCIA
  if (key.includes('CONDUTA')) return TIPO_DENUNCIA_MAP.CONDUTA_INAPROPRIADA
  if (key.includes('OUTRO')) return TIPO_DENUNCIA_MAP.OUTRO

  return { label: tipo, Icon: AlertCircle, bgColor: 'bg-gray-100', textColor: 'text-gray-700' }
}

export default function DenunciaMainInfoCard({ tipoDenuncia, registradoEm }) {
  const info = getTipoDenunciaInfo(tipoDenuncia)
  const IconComponent = info.Icon

  return (
    <section className="rounded-3xl border border-[var(--color-soft-line)] bg-white p-6 shadow-[var(--shadow-card)]">
      <div className="border-b border-[var(--color-soft-border)] pb-6">
        <div className="flex items-start gap-4">
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${info.bgColor}`}>
            <IconComponent className={`size-6 ${info.textColor}`} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-heading)]">{info.label}</h2>
            {registradoEm && (
              <p className="mt-1 text-base text-[var(--color-text)]">Registrado em {registradoEm}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

