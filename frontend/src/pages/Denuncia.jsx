import { useState } from 'react'
import MobileLayout from '../layout/MobileLayout'
import { AlertCircle, CheckCircle } from 'lucide-react'

function Denuncia() {
  const [formData, setFormData] = useState({
    identificationType: 'anonima',
    type: '',
    description: '',
    eventDate: '',
    eventLocation: '',
    affectedPerson: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const denunciationTypes = [
    { value: 'assedio', label: 'Assédio' },
    { value: 'discriminacao', label: 'Discriminação' },
    { value: 'violencia', label: 'Violência' },
    { value: 'conducta-inapropriada', label: 'Conduta Inapropriada' },
    { value: 'outro', label: 'Outro' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleIdentificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      identificationType: type
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Denúncia enviada:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        identificationType: 'anonima',
        type: '',
        description: '',
        eventDate: '',
        eventLocation: '',
        affectedPerson: '',
      })
    }, 3000)
  }

  if (submitted) {
    return (
      <MobileLayout>
        <div className="mx-auto flex min-h-96 max-w-[1200px] flex-col items-center justify-center px-5 py-8">
          <div className="rounded-2xl bg-white p-8 text-center">
            <CheckCircle className="mx-auto mb-4 size-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-[#1b1c19]">Denúncia Registrada</h2>
            <p className="mb-4 text-[#6b7066]">
              Sua denúncia foi recebida com sucesso. Obrigado por contribuir para uma comunidade mais segura.
            </p>
            <p className="text-sm text-[#999]">Redirecionando...</p>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-5 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#fcaa33]/15">
            <AlertCircle className="size-8 text-[#fcaa33]" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#1b1c19]">Registro de Denúncia Segura</h1>
            <p className="mt-2 text-sm text-[#6b7066]">
              Este espaço é dedicado para que você possa relatar situações que afetam o bem-estar e a integridade 
              da nossa comunidade acadêmica. Sinta-se em um ambiente de escuta acolhedor e protegido.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-[rgba(188,202,193,0.3)] bg-white p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Identification Toggle */}
            <div className="mb-8">
              <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-[#6b7066]">
                IDENTIFICAÇÃO
              </label>
              <div className="mb-3 flex gap-3 rounded-full bg-[#f5f5f5] p-1">
                <button
                  type="button"
                  onClick={() => handleIdentificationChange('anonima')}
                  className={`flex-1 rounded-full py-2 font-semibold transition-colors ${
                    formData.identificationType === 'anonima'
                      ? 'bg-[#fcaa33] text-[#6b4200]'
                      : 'bg-transparent text-[#6b7066] hover:text-[#1b1c19]'
                  }`}
                >
                  Anônima
                </button>
                <button
                  type="button"
                  onClick={() => handleIdentificationChange('identificada')}
                  className={`flex-1 rounded-full py-2 font-semibold transition-colors ${
                    formData.identificationType === 'identificada'
                      ? 'bg-[#fcaa33] text-[#6b4200]'
                      : 'bg-transparent text-[#6b7066] hover:text-[#1b1c19]'
                  }`}
                >
                  Identificada
                </button>
              </div>
              <p className="text-xs text-[#999]">
                Sua identidade não será revelada e seus dados não serão armazenados com esta denúncia.
              </p>
            </div>

            {/* Type of Denunciation */}
            <div className="mb-6">
              <label htmlFor="type" className="mb-2 block font-semibold text-[#1b1c19]">
                Tipo de Denúncia *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
              >
                <option value="">Selecione o tipo de denúncia</option>
                {denunciationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="description" className="mb-2 block font-semibold text-[#1b1c19]">
                Descrição do Incidente *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Descreva detalhadamente o que aconteceu..."
                className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
              />
            </div>

            {/* Event Date */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="eventDate" className="mb-2 block font-semibold text-[#1b1c19]">
                  Data do Incidente
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
                />
              </div>

              {/* Event Location */}
              <div>
                <label htmlFor="eventLocation" className="mb-2 block font-semibold text-[#1b1c19]">
                  Local do Incidente
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="Onde ocorreu?"
                  className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
                />
              </div>
            </div>

            {/* Affected Person */}
            <div className="mb-6">
              <label htmlFor="affectedPerson" className="mb-2 block font-semibold text-[#1b1c19]">
                Pessoa Afetada
              </label>
              <input
                type="text"
                id="affectedPerson"
                name="affectedPerson"
                value={formData.affectedPerson}
                onChange={handleChange}
                placeholder="Quem foi afetado? (deixe em branco se for você)"
                className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
              />
            </div>

           

            {/* Conditional Fields for Identified */}
              {formData.identificationType === 'identificada' && (
                <div className="mb-8 rounded-lg bg-[#f5f5f5] p-4">
                  <p className="mb-4 text-sm font-semibold text-[#1b1c19]">Dados para Contato</p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      className="rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
                    />
                    <input
                      type="tel"
                      placeholder="Seu telefone"
                      className="rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33]"
                    />
                    <input
                      type="email"
                      placeholder="Seu email"
                      // ADICIONADO A CLASSE md:col-span-2 AQUI:
                      className="w-full rounded-lg border border-[rgba(188,202,193,0.3)] bg-white px-4 py-3 text-[#1b1c19] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#fcaa33] md:col-span-2"
                    />
                  </div>
                </div>
              )}

            {/* Privacy Notice */}
            <div className="mb-8 rounded-lg bg-blue-50 p-4">
              <p className="text-xs text-[#0066cc]">
                <strong>Proteção de Dados:</strong> Suas informações serão tratadas com total confidencialidade. 
                Você pode solicitar acompanhamento anônimo ou identificado, conforme sua preferência.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#fcaa33] px-6 py-3 font-semibold text-[#6b4200] transition-all hover:bg-[#f9a520] active:scale-95 md:max-w-xs"
            >
              Enviar Denúncia
            </button>
          </form>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Denuncia
