import MobileLayout from '../layout/MobileLayout'
import RestrictedAccessBanner from '../components/RestrictedAccessBanner'
import InputField from '../components/InputField'
import PasswordInput from '../components/PasswordInput'
import BtnEnviarCadastro from '../components/BtnEnviarCadastro'
import IconAlerta from '../assets/icon/alerta.svg'

function Cadastra() {
  return (
    <MobileLayout>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#1b1c19]">Cadastrar</h1>
            <p className="mt-2 text-sm leading-6 text-[#3d4943]">
              O acesso a esta área é limitado conforme a função do usuário.
            </p>
          </div>

          <RestrictedAccessBanner />

          <div className="mt-6 p-4 text-center rounded-[32px] border border-[var(--color-soft-line)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-card)]">
            <div className='flex flex-col items-start gap-2 self-stretch'>
              <div className='flex flex-col items-center self-stretch'>
                <p className="text-[#00694C] text-center font-['Plus_Jakarta_Sans'] text-[32px] font-bold leading-[40px] tracking-[-0.64px]">
                  Novo Admistrador
                </p>
              </div>
              <div className='flex flex-col items-center self-stretch'>
              <p>
                Preencha os dados institucionais para
                autorizar um novo acesso ao painel de
                controle.
              </p>
              </div>
          
            </div>
              <div className="flex flex-col gap-6 self-stretch px-4 mt-6">
                <div className="inline-grid pb-4 gap-x-6 gap-y-6 self-stretch items-center grid-cols-1 grid-rows-4">
                  <InputField
                    label="Nome completo"
                    placeholder="Ex: João da Silva"
                  />
                  <InputField
                    label="E-mail Institucional"
                    placeholder="Ex: joao.silva@ifrn.edu.br"
                    />
                    <PasswordInput
                      label="Senha"
                      placeholder="••••••••"
                    />
                    <PasswordInput
                      label="Confirmar Senha"
                      placeholder="••••••••"
                    />
                </div>
                <BtnEnviarCadastro />
                <div className='flex pt-[16px] justify-center items-center gap-[8px] self-stretch mb-4'>
                  <div className='flex flex-col items-start'> 
                      <img src={IconAlerta} alt="Alerta" className="w-5 h-5" />
                  </div>
                  <div className ='flex flex-col items-start'>
                    <p classNName=" text-[#3D4943] font-['Plus_Jakarta_Sans'] text-sm font-normal leading-5">
                      Uma confirmação será enviada ao e-
                      mail informado.
                    </p>
                  </div>
                </div>
              </div>

              
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

export default Cadastra