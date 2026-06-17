import { NavLink } from 'react-router-dom'
import { Home, Heart, CircleAlert } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Início', icon: Home, end: true },
  { to: '/acolhimento', label: 'Acolhimento', icon: Heart },
  { to: '/denuncia', label: 'Denúncias', icon: CircleAlert },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 gap-2 border-t border-[rgba(188,202,193,0.3)] bg-white/80 px-4 pb-4 pt-2 backdrop-blur-[6px] lg:hidden"
      aria-label="Navegação inferior"
      data-node-id="1:43"
      data-name="BottomNavBar - Mobile Only Navigation Pattern"
    >
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 rounded-2xl py-2 transition-colors ${
              isActive ? 'bg-[#fcaa33] text-[#6b4200]' : 'text-[#3d4943]'
            }`
          }
        >
          <Icon className="size-[18px]" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
