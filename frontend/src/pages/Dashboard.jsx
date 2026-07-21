import { useState, useEffect } from 'react'
import MobileLayout from '../layout/MobileLayout'
import StatCard from '../components/StatCard'
import DashboardFilters from '../components/DashboardFilters'
import SentimentChart from '../components/SentimentChart'
import CategoryChart from '../components/CategoryChart'
import ReportsTable from '../components/ReportsTable'
import BotaoAdicionarAdmin from '../components/BotaoAdicionarAdmin'
import { getDashboardCount, getDashboardSemanal, getDashboardHumor, getDashboardPizzaGrafico, getDashboardCategoriaGrafico } from '../services/Dashboard'

function Dashboard() {
  const [counts, setCounts] = useState({ qtdAcolhimento: 0, qtdDenuncia: 0, qtdPedente: 0 })
  const [semanal, setSemanal] = useState({ qtdAcolhimento: 0, qtdDenuncia: 0, qtdPedente: 0 })
  const [humor, setHumor] = useState({humor: 'NEUTRO'})
  const [pizzaData, setPizzaData] = useState([])
  const [categoriaData, setCategoriaData] = useState([])
  const [filters, setFilters] = useState({ curso: '', periodo: '', tipodenuncia: '' })
  const [errorMsg, setErrorMsg] = useState('')

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setErrorMsg('')
        const [countData, semanalData, humorData, pizzaRes, categoriaRes] = await Promise.all([
          getDashboardCount(filters.curso, filters.periodo),
          getDashboardSemanal(filters.curso, filters.periodo),
          getDashboardHumor(),
          getDashboardPizzaGrafico(filters.curso, filters.periodo),
          getDashboardCategoriaGrafico()
        ])
        if (countData) setCounts(countData)
        if (semanalData) setSemanal(semanalData)
        if (humorData) setHumor(humorData)
        if (pizzaRes) {
          const formattedData = pizzaRes.map(item => ({
            name: item.humor,
            value: item.porcentagem
          }))
          setPizzaData(formattedData)
        }
        if (categoriaRes) {
          const formattedCatData = categoriaRes.map(item => ({
            category: item.tipoDenuncia,
            value: item.quantidade
          }))
          setCategoriaData(formattedCatData)
        }
      } catch (error) {
        if (error.mensagem) {
          setErrorMsg(error.mensagem)
        }
        console.error("Erro ao carregar os dados do dashboard:", error)
      }
    }
    fetchDashboardData()
  }, [filters])

  const stats = [
    { title: 'Acolhimentos', value: counts.qtdAcolhimento, subtitle: `+${semanal.qtdAcolhimento} esta semana` },
    { title: 'Denúncias', value: counts.qtdDenuncia, subtitle: `+${semanal.qtdDenuncia} esta semana` },
    { title: 'Pendências', value: counts.qtdPedente, subtitle: `+${semanal.qtdPedente} esta semana` },
    { title: 'Sentimento Geral', value: humor.humor, highlighted: true, subtitle: humor.descricao }
  ]

  return (
    <MobileLayout>
      <div className="mx-auto max-w-[1200px] px-5 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1b1c19] mb-2">Visão Geral</h1>
          <p className="text-[#3d4943]">
            Monitoramento em tempo real do bem-estar e integridade institucional.
          </p>
        </div>
        <div className="mb-6">
          <BotaoAdicionarAdmin />
        </div>
        {/* Filters */}
        {errorMsg && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {errorMsg}
          </div>
        )}
        <DashboardFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} bgColor="bg-[#f7f9f8]" />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentChart data={pizzaData} />
          <CategoryChart data={categoriaData} />
        </div>

        {/* Reports Table */}
        <ReportsTable />
      </div>
    </MobileLayout>
  )
}

export default Dashboard
