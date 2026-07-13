import { useState, useEffect } from 'react'
import MobileLayout from '../layout/MobileLayout'
import StatCard from '../components/StatCard'
import DashboardFilters from '../components/DashboardFilters'
import SentimentChart from '../components/SentimentChart'
import CategoryChart from '../components/CategoryChart'
import ReportsTable from '../components/ReportsTable'
import BotaoAdicionarAdmin from '../components/BotaoAdicionarAdmin'
import { getDashboardCount, getDashboardSemanal, getDashboardHumor, getDashboardPizzaGrafico } from '../services/Dashboard'

function Dashboard() {
  const [counts, setCounts] = useState({ qtdAcolhimento: 0, qtdDenuncia: 0, qtdPedente: 0 })
  const [semanal, setSemanal] = useState({ qtdAcolhimento: 0, qtdDenuncia: 0, qtdPedente: 0 })
  const [humor, setHumor] = useState({humor: 'NEUTRO'})
  const [pizzaData, setPizzaData] = useState([])
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [countData, semanalData, humorData, pizzaRes] = await Promise.all([
          getDashboardCount(),
          getDashboardSemanal(),
          getDashboardHumor(),
          getDashboardPizzaGrafico()
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
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error)
      }
    }
    fetchDashboardData()
  }, [])

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
        <DashboardFilters />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} bgColor="bg-[#f7f9f8]" />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SentimentChart data={pizzaData} />
          <CategoryChart />
        </div>

        {/* Reports Table */}
        <ReportsTable />
      </div>
    </MobileLayout>
  )
}

export default Dashboard
