import { Menu } from 'lucide-react'

export default function Header({ onMenuToggle }) {
  return (
    <header className="flex h-16 items-center px-5 py-0 relative bg-white border-b [border-bottom-style:solid] border-[var( --cor-linha)]">
      <div className="inline-flex items-center gap-4 relative">
        <button
          onClick={onMenuToggle}
          className="text-[var(--primary)] hover:opacity-70 transition-opacity p-1 rounded-lg"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-[var(--primary)] font-bold text-lg">EscutalF</h1>
      </div>
    </header>
  )
}