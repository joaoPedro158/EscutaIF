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
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-surface-muted)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <LoginBackground />

        <header className="relative z-10 flex items-center py-2 sm:py-4">
          <LoginBrand />
        </header>

        <main className="relative z-10 flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="w-full max-w-[440px]">
            <LoginCard
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              passwordVisible={passwordVisible}
              onTogglePassword={() => setPasswordVisible((current) => !current)}
            />

            <LoginPrivacyMessage />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Login
