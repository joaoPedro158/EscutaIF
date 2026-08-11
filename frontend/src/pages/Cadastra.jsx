import { useState } from 'react'
import MobileLayout from '../layout/MobileLayout'
import RestrictedAccessBanner from '../components/RestrictedAccessBanner'
import InputField from '../components/InputField'
import PasswordInput from '../components/PasswordInput'
import BtnEnviarCadastro from '../components/BtnEnviarCadastro'
import IconAlerta from '../assets/icon/alerta.svg'
import { validarCadastro, cadastrarAdministrador } from '../services/cadastro'

function Cadastra() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    confirma_senha: '',
  })

  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDados((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpa o erro do campo alterado
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }

    // Limpa erros e mensagens de sucesso globais ao editar
    setSubmitError('')
    setSuccessMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSuccessMessage('')

    // Validação local no frontend
    const errosValidacao = validarCadastro(dados)
    if (Object.keys(errosValidacao).length > 0) {
      setErrors(errosValidacao)
      return
    }

    setLoading(true)
    try {
      await cadastrarAdministrador(dados)
      setSuccessMessage('Administrador cadastrado com sucesso!')
      
      // Limpa os campos do formulário após sucesso
      setDados({
        nome: '',
        email: '',
        senha: '',
        confirma_senha: '',
      })
      setErrors({})
    } catch (err) {
      console.error('Erro na submissão do formulário:', err)
      
      // Trata exceções do backend (ex: email repetido)
      if (err && err.mensagem) {
        const msg = err.mensagem
        if (msg.toLowerCase().includes('email') || msg.toLowerCase().includes('e-mail')) {
          setErrors((prev) => ({
            ...prev,
            email: msg,
          }))
        } else {
          setSubmitError(msg)
        }
      } else {
        setSubmitError(err.message || 'Erro ao processar a solicitação. Tente novamente mais tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MobileLayout>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <RestrictedAccessBanner />

          <div className="mt-6 p-4 text-center rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-card)]">
            <div className="flex flex-col items-start gap-2 self-stretch">
              <div className="flex flex-col items-center self-stretch">
                <p className="text-[#00694C] text-center font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[40px] tracking-[-0.64px]">
                  Novo Administrador
                </p>
              </div>
              <div className="flex flex-col items-center self-stretch">
                <p>
                  Preencha os dados institucionais para
                  autorizar um novo acesso ao painel de
                  controle.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 self-stretch px-4 mt-6">
              {successMessage && (
                <div className="p-4 text-sm text-[#00694c] bg-[rgba(0,105,76,0.05)] border border-[#00694c]/20 rounded-[16px] text-center font-semibold">
                  {successMessage}
                </div>
              )}
              {submitError && (
                <div className="p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-[16px] text-center font-semibold">
                  {submitError}
                </div>
              )}

              <div className="inline-grid pb-4 gap-x-6 gap-y-6 self-stretch items-center grid-cols-1 grid-rows-4">
                <InputField
                  label="Nome completo"
                  name="nome"
                  id="nome"
                  value={dados.nome}
                  onChange={handleChange}
                  placeholder="Ex: João da Silva"
                  error={errors.nome}
                  disabled={loading}
                />
                <InputField
                  label="E-mail Institucional"
                  name="email"
                  id="email"
                  value={dados.email}
                  onChange={handleChange}
                  placeholder="Ex: joao.silva@ifrn.edu.br"
                  error={errors.email}
                  disabled={loading}
                />
                <PasswordInput
                  label="Senha"
                  name="senha"
                  id="senha"
                  value={dados.senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.senha}
                  disabled={loading}
                />
                <PasswordInput
                  label="Confirmar Senha"
                  name="confirma_senha"
                  id="confirma_senha"
                  value={dados.confirma_senha}
                  onChange={handleChange}
                  placeholder="••••••••"
                  error={errors.confirma_senha}
                  disabled={loading}
                />
              </div>

              <BtnEnviarCadastro disabled={loading} />

              <div className="flex pt-[16px] justify-center items-center gap-[8px] self-stretch mb-4">
                <div className="flex flex-col items-start"> 
                  <img src={IconAlerta} alt="Alerta" className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-[#3D4943] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5">
                    Uma confirmação será enviada ao e-mail informado.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Cadastra