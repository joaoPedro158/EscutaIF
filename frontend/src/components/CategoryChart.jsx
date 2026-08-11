import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function CategoryChart({ data = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-[#f0eee9]">
      <h3 className="text-lg font-semibold text-[#1b1c19] mb-6">Categorias de Denúncias</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0eee9" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: `1px solid #f0eee9`,
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="value" fill="#00694c" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
