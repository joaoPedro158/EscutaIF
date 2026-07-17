import { ChevronDown } from 'lucide-react'

export default function DashboardFilters({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-3 mb-8">
      <div className="relative flex-1 min-w-0">
        <select 
          value={filters.curso}
          onChange={(e) => onFilterChange('curso', e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#f0eee9] bg-white px-4 py-3 pr-10 text-[#3d4943] hover:bg-[#fbf9f4] transition-colors focus:outline-none"
        >
          <option value="">Todos os Cursos</option>
          <option value="TADS">TADS</option>
          <option value="TPQ">TPQ</option>
          <option value="QUIMICA">Química</option>
          <option value="INFORMATICA">Informática</option>
          <option value="ADMINISTRACAO">Administração</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#3d4943]">
          <ChevronDown size={18} />
        </div>
      </div>
      <div className="relative flex-1 min-w-0">
        <select 
          value={filters.periodo}
          onChange={(e) => onFilterChange('periodo', e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#f0eee9] bg-white px-4 py-3 pr-10 text-[#3d4943] hover:bg-[#fbf9f4] transition-colors focus:outline-none"
        >
          <option value="">Todos os Períodos</option>
          <option value="1">1º Período</option>
          <option value="2">2º Período</option>
          <option value="3">3º Período</option>
          <option value="4">4º Período</option>
          <option value="5">5º Período</option>
          <option value="6">6º Período</option>
          <option value="7">7º Período</option>
          <option value="8">8º Período</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#3d4943]">
          <ChevronDown size={18} />
        </div>
      </div>
      <div className="relative flex-1 min-w-0">
        <select 
          value={filters.tipodenuncia}
          onChange={(e) => onFilterChange('tipodenuncia', e.target.value)}
          className="w-full appearance-none rounded-lg border border-[#f0eee9] bg-white px-4 py-3 pr-10 text-[#3d4943] hover:bg-[#fbf9f4] transition-colors focus:outline-none"
        >
          <option value="">Todos os Tipos</option>
          <option value="ASSEDIO">Assédio</option>
          <option value="DISCRIMINACAO">Discriminação</option>
          <option value="VIOLENCIA">Violência</option>
          <option value="CONDUTA_INAPROPRIADA">Conduta Inapropriada</option>
          <option value="OUTRO">Outro</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[#3d4943]">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  )
}
