import { Brain, HandHeart, ShieldCheck } from 'lucide-react'
import FeatureCard from './FeatureCard'

const features = [
  {
    icon: Brain,
    iconClassName: 'text-[#00694c]',
    iconBgClassName: 'bg-[rgba(0,105,76,0.1)]',
    title: 'Escuta Qualificada',
    description:
      'Profissionais capacitados para acolher suas demandas emocionais e pedagógicas com sigilo absoluto.',
  },
  {
    icon: HandHeart,
    iconClassName: 'text-[#855400]',
    iconBgClassName: 'bg-[rgba(133,84,0,0.1)]',
    title: 'Apoio em Rede',
    description:
      'Conectamos você aos serviços de saúde e assistência social do IFRN e da região de Nova Cruz.',
  },
  {
    icon: ShieldCheck,
    iconClassName: 'text-[#d85a30]',
    iconBgClassName: 'bg-[rgba(216,90,48,0.1)]',
    title: 'Canal Seguro',
    description:
      'Sua denúncia é tratada com rigor ético, garantindo a proteção contra qualquer tipo de retaliação.',
  },
]

export default function FeaturesSection() {
  return (
    <section
      className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      data-node-id="1:115"
      data-name="Features Section Bento Style Grid"
    >
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  )
}
