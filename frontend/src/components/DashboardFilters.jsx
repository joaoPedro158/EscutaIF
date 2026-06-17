import { ChevronDown } from 'lucide-react'

export default function DashboardFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-3 mb-8">
      <div className="relative flex-1 min-w-0">
        <button className="w-full flex items-center justify-between gap-2 rounded-lg border border-[#f0eee9] bg-white px-4 py-3 text-[#3d4943] hover:bg-[#fbf9f4] transition-colors">
          <span className="text-sm font-medium truncate">Todos os Cursos</span>
          <ChevronDown size={18} className="flex-shrink-0" />
        </button>
      </div>
      <div className="relative flex-1 min-w-0">
        <button className="w-full flex items-center justify-between gap-2 rounded-lg border border-[#f0eee9] bg-white px-4 py-3 text-[#3d4943] hover:bg-[#fbf9f4] transition-colors">
          <span className="text-sm font-medium truncate">Todas as Turmas</span>
          <ChevronDown size={18} className="flex-shrink-0" />
        </button>
      </div>
    </div>
  )
}
