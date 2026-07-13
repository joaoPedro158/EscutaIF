import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = ['#ef4444', '#f97316', '#9ca3af', '#84cc16', '#22c55e'];

export default function SentimentChart({ data = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-[#f0eee9]">
      <h3 className="text-lg font-semibold text-[#1b1c19] mb-6">Distribuição de Sentimentos</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {data.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-3">
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: COLORS[idx] }}
            />
            <span className="text-sm text-[#3d4943]">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
