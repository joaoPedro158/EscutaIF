import MobileLayout from '../layout/MobileLayout'
import HeroSection from '../components/HeroSection'
import FeaturesSection from '../components/FeaturesSection'

function Home() {
  return (
    <MobileLayout>
      <div
        className="mx-auto flex w-full max-w-[1200px] flex-col gap-20 px-5 py-8"
        data-node-id="1:66"
        data-name="Container"
      >
        <HeroSection />
        <FeaturesSection />
      </div>
    </MobileLayout>
  )
}

export default Home
