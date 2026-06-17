import MobileLayout from '../layout/MobileLayout'
import RestrictedAccessBanner from '../components/RestrictedAccessBanner'

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
        </div>
      </div>
    </MobileLayout>
  )
}

export default Cadastra