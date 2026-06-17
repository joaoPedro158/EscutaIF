import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBackground from '../components/login/LoginBackground'
import LoginBrand from '../components/login/LoginBrand'
import LoginCard from '../components/login/LoginCard'
import LoginPrivacyMessage from '../components/login/LoginPrivacyMessage'

function Login() {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData((current) => ({ ...current, [id]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
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
          />

          <LoginPrivacyMessage />
        </main>
      </div>
    </div>
  )
}

export default Login
