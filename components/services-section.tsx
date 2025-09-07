import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Baby, Stethoscope, Users } from "lucide-react"

const services = [
  {
    title: "Médecine Générale",
    description: "Consultations et soins de première ligne pour toute la famille",
    icon: Stethoscope,
  },
  {
    title: "Cardiologie",
    description: "Spécialistes du cœur et des maladies cardiovasculaires",
    icon: Heart,
  },
  {
    title: "Pédiatrie",
    description: "Soins spécialisés pour les enfants et adolescents",
    icon: Baby,
  },
  {
    title: "Gynécologie",
    description: "Santé féminine et suivi gynécologique complet",
    icon: Users,
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Services Médicaux</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une équipe pluridisciplinaire à votre service pour répondre à tous vos besoins de santé
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-card-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
