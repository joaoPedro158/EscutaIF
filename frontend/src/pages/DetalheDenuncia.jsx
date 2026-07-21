import { useState } from 'react'
import MobileLayout from '../layout/MobileLayout'
import DenunciaMainInfoCard from '../components/denuncia-detalhe/DenunciaMainInfoCard'
import DenunciaDetailsCard from '../components/denuncia-detalhe/DenunciaDetailsCard'
import ProcessTrackingCard from '../components/denuncia-detalhe/ProcessTrackingCard'
import IdentificationDataCard from '../components/denuncia-detalhe/IdentificationDataCard'
import { PROCESS_STATUS_LABELS, detalheDenunciaMock } from '../mocks/detalheDenunciaMock'

export default function DetalheDenuncia() {
  const [selectedStatus, setSelectedStatus] = useState(detalheDenunciaMock.statusAtual)
  const [confirmedStatus, setConfirmedStatus] = useState(detalheDenunciaMock.statusAtual)

  const handleConfirmStatus = () => {
    setConfirmedStatus(selectedStatus)
  }

  return (
    <MobileLayout>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8 lg:py-10">
        <div className="mb-6 space-y-2">
          <h1 className="text-[26px] font-bold leading-8 tracking-[-0.52px] text-[var(--primary)]">
            Detalhes da Denúncia
          </h1>
          <span className="inline-flex rounded-full bg-[#e4e2de] px-3 py-1 text-sm font-semibold text-[var(--color-text)]">
            Protocolo #{detalheDenunciaMock.protocolo}
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <DenunciaMainInfoCard
              tipoDenuncia={detalheDenunciaMock.tipoDenuncia}
              registradoEm={detalheDenunciaMock.registradoEm}
            />

            <DenunciaDetailsCard
              descricao={detalheDenunciaMock.descricao}
              dataIncidente={detalheDenunciaMock.dataIncidente}
              local={detalheDenunciaMock.local}
              pessoaAfetada={detalheDenunciaMock.pessoaAfetada}
            />

            <ProcessTrackingCard
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              onConfirm={handleConfirmStatus}
            />

            <p className="text-sm text-[var(--color-text)]">
              Status confirmado: <strong>{PROCESS_STATUS_LABELS[confirmedStatus]}</strong>
            </p>
          </div>

          <div>
            <IdentificationDataCard isAnonymous={detalheDenunciaMock.identificacao.anonima} />
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
