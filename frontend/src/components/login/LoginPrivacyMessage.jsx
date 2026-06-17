export default function LoginPrivacyMessage() {
  return (
    <section className="flex flex-col items-stretch gap-4 pt-6 sm:pt-8">
      <div className="self-center h-px w-24 bg-[var(--color-soft-line)]" aria-hidden="true" />
      <p className="px-1 text-center text-sm leading-5 text-[var(--color-text)]">
        Sua privacidade é nossa prioridade. Todos os dados são tratados conforme a LGPD e as normas de ética
        estudantil do IFRN.{' '}
        <span className="font-bold text-[var(--primary)]">Políticas de Segurança</span>.
      </p>
    </section>
  )
}
