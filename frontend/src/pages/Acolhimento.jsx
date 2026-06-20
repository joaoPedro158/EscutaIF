import MobileLayout from '../layout/MobileLayout'
import { useMemo, useState } from 'react'
import { Heart, ShieldCheck, BookOpen, Users, Sparkles, Send, ChevronDown } from 'lucide-react'
import { enviarAcolhimento } from '../services/Acolhimento'

function Acolhimento() {
  const [selectedMood, setSelectedMood] = useState('neutro')
  const [formData, setFormData] = useState({
    curso: '',
    genero: '',
    turma: '',
    turno: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const moodCards = useMemo(
    () => [
      { id: 'muito_triste', emoji: '😞', label: 'Muito Triste', tone: 'var(--color-surface-strong)' },
      { id: 'triste', emoji: '🙁', label: 'Triste', tone: 'var(--color-surface-strong)' },
      { id: 'neutro', emoji: '😐', label: 'Neutro', tone: 'var(--color-surface-strong)' },
      { id: 'feliz', emoji: '🙂', label: 'Feliz', tone: 'var(--color-surface-strong)' },
      { id: 'muito_feliz', emoji: '😁', label: 'Muito Feliz', tone: 'var(--color-surface-strong)' },
    ],
    [],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)

    const periodoPorTurma = {
      '1_ano': 1,
      '2_ano': 2,
      '3_ano': 3,
      '4_ano': 4,
    }

    const dadosParaEnviar = {
      genero: formData.genero,
      turno: formData.turno,
      humor: selectedMood,
      curso: formData.curso,
      periodo: periodoPorTurma[formData.turma] ?? null,
    }

    console.log('Dados enviados para a API:', dadosParaEnviar)

    try {
      await enviarAcolhimento(dadosParaEnviar)
    } catch (error) {
      console.error('Erro ao enviar acolhimento:', error)
    } finally {
      window.setTimeout(() => setSubmitted(false), 2500)
    }
  }

  return (
    <MobileLayout>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col px-5 py-8">
        <div className="flex flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="relative overflow-hidden rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-card)] md:p-8">
              <div className="pointer-events-none absolute -right-12 top-0 size-40 rounded-full bg-[var(--color-soft-green)] blur-3xl" />
              <div className="relative flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold leading-5 text-[var(--color-ifrn)]">IFRN</span>
                    <span className="text-base leading-6 text-[var(--color-text)]">Campus Nova Cruz</span>
                  </div>
                  <div className="h-10 w-px bg-[var(--color-border)]" aria-hidden="true" />
                  <span className="text-base font-bold leading-6 text-[var(--primary)]">EscutaIF</span>
                </div>

                <div className="flex flex-col gap-4">
                  <h1 className="max-w-xl text-[26px] font-bold leading-8 tracking-[-0.65px] text-[var(--color-heading)]">
                    Como você está se sentindo
                    <span className="text-[var(--primary)]"> hoje?</span>
                  </h1>
                  <p className="max-w-2xl text-lg leading-7 text-[var(--color-text)]">
                    Este é um espaço de acolhimento institucional. Suas respostas nos ajudam a entender
                    o clima escolar e promover ações de bem-estar.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {moodCards.map((mood) => {
                    const active = selectedMood === mood.id

                    return (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setSelectedMood(mood.id)}
                        className={`flex min-h-28 flex-col items-center justify-center gap-2 rounded-[24px] border p-4 text-center transition-all ${
                          active
                            ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_10px_15px_-3px_rgba(0,105,76,0.2),0_4px_6px_-4px_rgba(0,105,76,0.2)]'
                            : 'border-[var(--color-soft-line)] bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:-translate-y-1 hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        <span className="text-3xl" aria-hidden="true">
                          {mood.emoji}
                        </span>
                        <span className="text-sm font-semibold">{mood.label}</span>
                      </button>
                    )
                  })}
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-[var(--color-soft-line)] bg-[var(--color-surface)] p-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-soft-warm)]">
                      <ShieldCheck className="size-5 text-[#6b4200]" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm font-bold tracking-[0.14px] text-[var(--color-heading)]">
                        Privacidade & Proteção
                      </h2>
                      <p className="text-sm leading-5 text-[var(--color-text)]">
                        Sua identidade é protegida. Sinta-se seguro para compartilhar.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border-l-4 border-[var(--primary)] bg-white px-4 py-3 text-sm leading-5 text-[var(--color-text)]">
                    <span className="font-semibold text-[var(--color-heading)]">“Ouvir é um ato de cuidado.”</span>{' '}
                    Estamos aqui para construir um IFRN mais acolhedor para todos.
                  </div>
                </div>
              </div>
            </section>

            <aside className="grid gap-4">
              <div className="rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-card)]">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[var(--color-soft-warm)]">
                  <Heart className="size-6 text-[#6b4200]" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold leading-7 text-[var(--color-heading)]">
                  Sua voz está segura
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text)]">
                  Nenhuma informação pessoal será coletada ou vinculada a você. Os dados de curso e turma são usados
                  exclusivamente para identificar necessidades coletivas no campus.
                </p>
              </div>

              <div className="rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--primary)] p-6 text-white shadow-[var(--shadow-panel)]">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/15">
                  <Sparkles className="size-6" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold leading-7">Acolhimento ativo</h2>
                <p className="mt-3 text-sm leading-6 text-white/85">
                  Responda com tranquilidade. Os dados abaixo são apenas mockados para demonstrar a interface.
                </p>
              </div>
            </aside>
          </div>

          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-card)]"
          >
            <div className="border-b border-[var(--color-soft-line)] px-6 py-5 md:px-8">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--color-soft-green)]">
                  <BookOpen className="size-5 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-[0.14px] text-[var(--color-heading)]">
                    Informações Complementares
                  </h2>
                  <p className="text-sm text-[var(--color-text)]">Preencha os campos abaixo para contextualizar seu momento.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 px-6 py-6 md:grid-cols-2 md:px-8">
              {[
                {
                  label: 'Curso',
                  name: 'curso',
                  placeholder: 'Selecione seu curso',
                  opcoes: [
                    { valor: 'tads', texto: 'TADS' },
                    { valor: 'tpq', texto: 'TPQ' },
                    { valor: 'informatica', texto: 'Informática' },
                    { valor: 'quimica', texto: 'Química' },
                    { valor: 'administracao', texto: 'Administração' },
                  ],
                },
                {
                  label: 'Gênero',
                  name: 'genero',
                  placeholder: 'Selecione seu gênero',
                  opcoes: [
                    { valor: 'masculino', texto: 'Masculino' },
                    { valor: 'feminino', texto: 'Feminino' },
                    { valor: 'outro', texto: 'Outro' },
                    { valor: 'nao_informar', texto: 'Prefiro não informar' },
                  ],
                },
                {
                  label: 'Turma',
                  name: 'turma',
                  placeholder: 'Informe sua turma',
                  opcoes: [
                    { valor: '1_ano', texto: '1º Ano' },
                    { valor: '2_ano', texto: '2º Ano' },
                    { valor: '3_ano', texto: '3º Ano' },
                    { valor: '4_ano', texto: '4º Ano' },
                  ],
                },
                {
                  label: 'Turno',
                  name: 'turno',
                  placeholder: 'Selecione o turno',
                  opcoes: [
                    { valor: 'matutino', texto: 'Matutino' },
                    { valor: 'vespertino', texto: 'Vespertino' },
                    { valor: 'noturno', texto: 'Noturno' },
                  ],
                },
              ].map((field) => (
                <label key={field.name} className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {field.label}
                  </span>
                  <div className="relative">
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-[var(--color-soft-line)] bg-[var(--color-surface)] px-4 py-3 pr-10 text-[var(--color-heading)] outline-none transition-colors focus:border-[var(--primary)]"
                    >
                      {/* Opção padrão (Placeholder) */}
                      <option value="">{field.placeholder}</option>

                      {/* Renderiza as opções específicas deste campo dinamicamente */}
                      {field.opcoes.map((opcao) => (
                        <option key={opcao.valor} value={opcao.valor}>
                          {opcao.texto}
                        </option>
                      ))}
                    </select>
                    
                    <ChevronDown 
                      className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text)]" 
                      aria-hidden="true" 
                    />
                  </div>
                </label>
              ))}
            </div>

            <div className="border-t border-[var(--color-soft-line)] px-6 py-6 md:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[var(--color-text)]">
                  {submitted
                    ? 'Resposta enviada com sucesso. Obrigado por compartilhar.'
                    : `Humor selecionado: ${moodCards.find((item) => item.id === selectedMood)?.label ?? 'Neutro'}`}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Enviar de forma anônima
                  <Send className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-soft-green)]">
                  <Users className="size-5 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-heading)]">Escuta coletiva</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--color-text)]">
                As respostas ajudam a mapear o clima acadêmico e orientar ações de apoio aos estudantes.
              </p>
            </div>

            <div className="rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--color-soft-warm)]">
                  <ShieldCheck className="size-5 text-[#6b4200]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-heading)]">Sigilo garantido</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--color-text)]">
                Nenhum dado sensível é persistido. A interface mostra apenas conteúdo mockado, sem integração com banco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Acolhimento
