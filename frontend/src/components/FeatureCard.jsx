import { Link } from 'react-router-dom'

export default function FeatureCard({ icon: Icon, iconClassName, iconBgClassName, title, description, link }) {
  const content = (
    <>
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${iconBgClassName}`}
      >
        <Icon className={`size-6 ${iconClassName}`} strokeWidth={2} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold leading-7 text-[#1b1c19]">{title}</h3>
      <p className="text-sm leading-5 text-[#3d4943]">{description}</p>
    </>
  )

  const className = "relative flex flex-col gap-4 rounded-[32px] bg-white p-8 shadow-(--shadow-card) transition-transform hover:scale-105 cursor-pointer"

  if (link) {
    return (
      <Link to={link}>
        <article className={className}>
          {content}
        </article>
      </Link>
    )
  }

  return (
    <article className={className}>
      {content}
    </article>
  )
}
