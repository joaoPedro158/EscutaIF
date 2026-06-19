import { Link } from 'react-router-dom'
import { Users, Heart, CircleAlert, ShieldCheck } from 'lucide-react'
import StudentSupportIllustration from './StudentSupportIllustration'

export default function HeroSection() {
  return (
    <section
      className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16"
      data-node-id="1:67"
      data-name="Hero Section Grid Layout"
    >
      <div
        className="relative mx-auto flex w-full max-w-[480px] flex-col items-start justify-center lg:mx-0"
        data-node-id="1:68"
        data-name="Visual Element Column"
      >
        <div
          className="pointer-events-none absolute -inset-11 rounded-full bg-[rgba(0,105,76,0.1)] blur-[32px]"
          aria-hidden="true"
          data-node-id="1:69"
          data-name="Decorative background glow"
        />

        <div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[32px] bg-white p-4 shadow-(--shadow-card)"
          data-node-id="1:70"
          data-name="Main Image Container"
        >
          <StudentSupportIllustration />
        </div>

        <div
          className="absolute -bottom-4 -right-4 flex flex-col rounded-3xl bg-[#fcaa33] p-4 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] sm:-bottom-4 sm:-right-4"
          data-node-id="1:72"
          data-name="Floating Badge Component"
        >
          <div className="flex items-center gap-3">
            <Users className="size-[30px] shrink-0 text-[#6b4200]" strokeWidth={2.5} aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.48px] text-[#6b4200]">
                Comunidade Ativa
              </span>
              <span className="text-[10px] uppercase tracking-[0.5px] text-[#6b4200]/80">
                Juntos pelo bem-estar
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex w-full flex-col gap-8"
        data-node-id="1:82"
        data-name="Text Content Column"
      >
        <div
          className="flex flex-wrap items-center gap-4"
          data-node-id="1:83"
          data-name="Branding Header"
        >
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-5 text-[#004384]">IFRN</span>
            <span className="text-base leading-6 text-[#3d4943]">Campus Nova Cruz</span>
          </div>
          <div className="h-10 w-px shrink-0 bg-[#bccac1]" aria-hidden="true" />
          <span className="text-base font-bold leading-6 text-[#00694c]">EscutaIF</span>
        </div>

        <div className="flex flex-col gap-4" data-node-id="1:92" data-name="Heading Group">
          <h1
            className="text-[26px] font-bold leading-8 tracking-[-0.65px] text-[#1b1c19]"
            data-node-id="1:94"
          >
            Olá! Como podemos{' '}
            <span className="text-[#00694c]">apoiar você</span> hoje?
          </h1>
          <p className="max-w-2xl text-lg leading-7 text-[#3d4943]" data-node-id="1:96">
            O EscutaIF é o seu espaço seguro dentro do IFRN. Aqui, sua voz é ouvida com
            respeito e cuidado institucional.
          </p>
        </div>

        <div
          className="flex w-full max-w-lg flex-col gap-4"
          data-node-id="1:97"
          data-name="Action Buttons Flex Container"
        >
          <Link
            to="/acolhimento"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#00694c] px-8 text-sm font-semibold tracking-[0.14px] text-white shadow-[0_10px_15px_-3px_rgba(0,105,76,0.2),0_4px_6px_-4px_rgba(0,105,76,0.2)] transition-opacity hover:opacity-90"
          >
            <Heart className="size-5 shrink-0" aria-hidden="true" />
            Como estou me sentindo
          </Link>
          <Link
            to="/denuncia"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-[#bccac1] bg-white px-8 text-sm font-semibold tracking-[0.14px] text-[#3d4943] transition-colors hover:bg-[#f7f9f8]"
          >
            <CircleAlert className="size-[18px] shrink-0" aria-hidden="true" />
            Registrar denúncia
          </Link>
        </div>

        <div
          className="flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-[rgba(188,202,193,0.3)] bg-[#f7f9f8] p-6"
          data-node-id="1:107"
          data-name="Privacy Info Card Component"
        >
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#fcaa33]/20">
            <ShieldCheck className="size-5 text-[#6b4200]" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold tracking-[0.14px] text-[#1b1c19]">
              Privacidade & Proteção
            </h3>
            <p className="text-sm leading-5 text-[#3d4943]">
              Sua identidade é protegida. Sinta-se seguro para compartilhar. Utilizamos
              protocolos de criptografia e anonimato garantido por lei.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
