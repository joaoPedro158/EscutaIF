export default function FeatureCard({ icon: Icon, iconClassName, iconBgClassName, title, description }) {
  return (
    <article className="relative flex flex-col gap-4 rounded-[32px] bg-white p-8 shadow-(--shadow-card)">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${iconBgClassName}`}
      >
        <Icon className={`size-6 ${iconClassName}`} strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-7 text-[#1b1c19]">{title}</h3>
      <p className="text-sm leading-5 text-[#3d4943]">{description}</p>
    </article>
  )
}
