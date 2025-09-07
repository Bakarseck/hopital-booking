import { Mail, Phone, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Nous Contacter</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground">babacaramar02@gmail.com</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+33 7 73 33 98 35</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fuseau Horaire</h3>
            <p className="text-muted-foreground">Africa/Dakar</p>
          </div>
        </div>
      </div>
    </section>
  )
}
