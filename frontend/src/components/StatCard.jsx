export default function StatCard({ title, value, subtitle, bgColor, highlighted = false }) {
  return (
    <div
      className={`rounded-2xl p-6 transition-transform hover:scale-105 ${
        highlighted
          ? 'bg-gradient-to-br from-[#00694c] to-[#004d38] text-white shadow-lg'
          : `${bgColor || 'bg-white'} text-[#3d4943] border border-[#f0eee9]`
      }`}
    >
      <p className={`text-sm font-medium mb-3 ${highlighted ? 'text-white/90' : 'text-[#3d4943]'}`}>
        {title}
      </p>
      <p className={`text-3xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-[#1b1c19]'}`}>
        {value}
      </p>
      {subtitle && (
        <p className={`text-xs ${highlighted ? 'text-white/80' : 'text-[#3d4943]/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
