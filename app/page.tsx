import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { ContactSection } from "@/components/contact-section"
import { ReservationForm } from "@/components/reservation-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AdvantagesSection />
      <ContactSection />
      <ReservationForm />
      <Footer />
    </main>
  )
}
