import MobileLayout from '../layout/MobileLayout'
import StatCard from '../components/StatCard'
import DashboardFilters from '../components/DashboardFilters'
import SentimentChart from '../components/SentimentChart'
import CategoryChart from '../components/CategoryChart'
import ReportsTable from '../components/ReportsTable'
import BotaoAdicionarAdmin from '../components/BotaoAdicionarAdmin'

function Dashboard() {
  // Mock data for stats
  const stats = [
    { title: 'Acolhimentos', value: '247', subtitle: '+12 esta semana' },
    { title: 'Denúncias', value: '89', subtitle: '+5 esta semana' },
    { title: 'Pendências', value: '34', subtitle: '-8 esta semana' },
    { title: 'Sentimento Geral', value: 'Neutro', highlighted: true, subtitle: 'Tendência estável' }
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
          <SentimentChart />
          <CategoryChart />
        </div>

        {/* Reports Table */}
        <ReportsTable />
      </div>
    </MobileLayout>
  )
}

export default Dashboard
