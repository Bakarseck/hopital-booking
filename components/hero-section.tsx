"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToReservation = () => {
    document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-card to-background py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Bienvenue à l'Hôpital Central
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
          Votre santé, notre priorité. Des soins de qualité avec une équipe médicale expérimentée, dans un environnement
          moderne et bienveillant.
        </p>
        <Button
          onClick={scrollToReservation}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
        >
          Réserver maintenant
        </Button>
      </div>
    </section>
  )
}
