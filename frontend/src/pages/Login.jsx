import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBackground from '../components/login/LoginBackground'
import LoginBrand from '../components/login/LoginBrand'
import LoginCard from '../components/login/LoginCard'
import LoginPrivacyMessage from '../components/login/LoginPrivacyMessage'
import { validarLogin, logarUsuario } from '../services/Login'

function Login() {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((current) => ({ ...current, [id]: value }))

    // Limpa erro do campo modificado
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }))
    }
    // Limpa erro geral
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    // Validação local no frontend
    const errosValidacao = validarLogin(formData)
    if (Object.keys(errosValidacao).length > 0) {
      setErrors(errosValidacao)
      return
    }

    setLoading(true)
    try {
      await logarUsuario(formData)
      
      // Redireciona para o Dashboard em caso de sucesso
      navigate('/dashboard')
    } catch (err) {
      console.error('Erro ao realizar o login:', err)
      
      // Trata erros vindos do backend (ex: Email ou senha inválidos)
      if (err && err.mensagem) {
        setSubmitError(err.mensagem)
      } else {
        setSubmitError(err.message || 'Erro ao conectar-se com o servidor.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-surface-muted)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col">
        <LoginBackground />

        <header className="absolute left-0 top-0 z-10 flex h-20 w-full items-center px-5 backdrop-blur-[12px] bg-white/60">
          <LoginBrand />
        </header>

        <main className="relative z-10 flex flex-1 flex-col justify-center px-5 py-24">
          <LoginCard
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            passwordVisible={passwordVisible}
            onTogglePassword={() => setPasswordVisible((current) => !current)}
            errors={errors}
            submitError={submitError}
            loading={loading}
          />

          <LoginPrivacyMessage />
        </main>
      </div>
    </div>
  )
}

export default Login
