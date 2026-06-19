import logo from '../../assets/login-logo.svg'

export default function LoginBrand() {
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="" className="size-6 shrink-0" aria-hidden="true" />
      <span className="text-[20px] font-bold leading-7 text-[var(--primary)]">EscutaIF</span>
    </div>
  )
}
