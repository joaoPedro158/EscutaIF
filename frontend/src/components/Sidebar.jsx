import { NavLink } from 'react-router-dom'
import { Home, Heart, CircleAlert, LayoutDashboard, FileText, X } from 'lucide-react'

const navItems = [
  { to: '/home', label: 'Início', icon: Home, end: true },
  { to: '/acolhimento', label: 'Acolhimento', icon: Heart },
  { to: '/denuncia', label: 'Denúncias', icon: CircleAlert },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
]

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="flex items-center gap-3 px-6 pt-8">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#00694c]">
          <Heart className="size-5 text-white" fill="white" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-7 text-[#00694c]">EscutaIF</span>
          <span className="text-xs font-medium tracking-[0.48px] text-[#3d4943]">
            Bem-estar Estudantil
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-auto px-2 pt-8" aria-label="Navegação principal">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold tracking-[0.14px] transition-colors ${
                isActive
                  ? 'bg-[#008560] text-[#f5fff7]'
                  : 'text-[#3d4943] hover:bg-[rgba(0,105,76,0.06)]'
              }`
            }
          >
            <Icon className="size-[18px] shrink-0" aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[rgba(188,202,193,0.3)] px-6 py-6">
        <p className="text-xs font-medium tracking-[0.48px] text-[rgba(61,73,67,0.6)]">
          IFRN Campus Nova Cruz
        </p>
      </div>
    </>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Fechar menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#f6f3ef] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        data-node-id="1:3"
        data-name="Aside - NavigationDrawer - Reusable Sidebar Component"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#3d4943] hover:bg-black/5 lg:hidden"
          aria-label="Fechar menu lateral"
        >
          <X className="size-5" />
        </button>

        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  )
}
