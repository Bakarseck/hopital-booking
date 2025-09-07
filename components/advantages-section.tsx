import { Clock, Shield, MapPin } from "lucide-react"

const advantages = [
  {
    title: "Rapide",
    description: "Réservation en ligne simple et confirmation rapide de vos rendez-vous",
    icon: Clock,
  },
  {
    title: "Clair",
    description: "Informations transparentes sur nos services et disponibilités",
    icon: Shield,
  },
  {
    title: "Accessible",
    description: "Plateforme disponible 24h/24 pour vos demandes de rendez-vous",
    icon: MapPin,
  },
]

export function AdvantagesSection() {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Pourquoi Réserver en Ligne ?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une expérience simplifiée pour votre confort et votre tranquillité d'esprit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
                <advantage.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
