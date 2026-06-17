import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import LoginField from './LoginField'

export default function LoginCard({
  formData,
  onChange,
  onSubmit,
  passwordVisible,
  onTogglePassword,
}) {
  return (
    <section className="relative overflow-hidden rounded-[24px] bg-[var(--color-surface-strong)] p-6 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] sm:p-8">
      <div className="relative flex flex-col gap-6 sm:gap-8">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-[26px] font-bold leading-8 tracking-[-0.65px] text-[var(--color-heading)]">
            Bem-vindo
          </h1>
          <p className="text-base leading-6 text-[var(--color-text)]">
            Acesse sua conta institucional para iniciar o acolhimento.
          </p>
        </header>

        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <LoginField
            id="email"
            label="E-mail institucional"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="seu.nome@ifrn.edu.br"
            icon={Mail}
            autoComplete="email"
          />

          <LoginField
            id="password"
            label="Senha"
            type={passwordVisible ? 'text' : 'password'}
            value={formData.password}
            onChange={onChange}
            placeholder="Digite sua senha"
            icon={Lock}
            autoComplete="current-password"
            rightSlot={
              <button
                type="button"
                onClick={onTogglePassword}
                className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--primary)]"
                aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {passwordVisible ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
                <span className="hidden sm:inline">{passwordVisible ? 'Ocultar' : 'Mostrar'}</span>
              </button>
            }
          />

          <button
            type="submit"
            className="relative inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-4 text-sm font-semibold text-white shadow-[0_4px_6px_-4px_rgba(0,105,76,0.2),0_10px_15px_-3px_rgba(0,105,76,0.2)] transition-opacity hover:opacity-90"
          >
            Entrar
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  )
}
