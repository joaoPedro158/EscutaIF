import { Menu } from 'lucide-react'

export default function Header({ onMenuToggle }) {
  return (
    <header
      className="relative flex h-16 shrink-0 items-center border-b border-[rgba(188,202,193,0.3)] bg-white px-5 lg:hidden"
      data-node-id="1:59"
      data-name="TopAppBar - Mobile Only Header Pattern"
    >
      <div className="inline-flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuToggle}
          className="rounded-lg p-1 text-[#00694c] transition-opacity hover:opacity-70"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-bold leading-7 text-[#00694c]">EscutaIF</h1>
      </div>
    </header>
  )
}