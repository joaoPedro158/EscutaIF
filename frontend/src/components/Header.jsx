import { Menu } from 'lucide-react'

export default function Header({ onMenuToggle }) {
  return (
    <header className="flex items-center gap-3 px-4 py-4 bg-surface border-b border-gray-200">
      <button
        onClick={onMenuToggle}
        className="text-primary hover:opacity-70 transition-opacity"
        aria-label="Abrir menu"
      >
        <Menu size={22} />
      </button>
      <h1 className="text-primary font-bold text-lg">EscutalF</h1>
    </header>
  )
}