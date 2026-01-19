import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustLogos from '@/components/TrustLogos'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Comparison from '@/components/Comparison'
import UseCases from '@/components/UseCases'
import PoweredByAI from '@/components/PoweredByAI'
import FAQ from '@/components/FAQ'
import Pricing from '@/components/Pricing'
import CallToAction from '@/components/CallToAction'
import Footer from '@/components/Footer'
import GeminiBackground from '@/components/GeminiBackground'



export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <GeminiBackground />
      <Navbar />
      <Hero />
      <TrustLogos />
      <HowItWorks />

      <Features />
      <Comparison />
      <UseCases />
      <PoweredByAI />
      <FAQ />
      <Pricing />
      <CallToAction />
      <Footer />
    </main>
  )
}
