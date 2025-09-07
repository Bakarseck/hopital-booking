"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const services = ["Médecine Générale", "Cardiologie", "Pédiatrie", "Gynécologie"]

const medecins = {
  "Médecine Générale": ["Dr. Diallo", "Dr. Ndiaye", "Dr. Fall"],
  Cardiologie: ["Dr. Sarr", "Dr. Ba"],
  Pédiatrie: ["Dr. Cissé", "Dr. Sow"],
  Gynécologie: ["Dr. Diouf", "Dr. Mbaye"],
}

interface FormData {
  service: string
  medecin: string
  date: string
  heure: string
  prenom: string
  nom: string
  email: string
  telephone: string
  motif: string
  honeypot: string
}

export function ReservationForm() {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    medecin: "",
    date: "",
    heure: "",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    motif: "",
    honeypot: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Reset medecin when service changes
    if (field === "service") {
      setFormData((prev) => ({ ...prev, medecin: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/reserver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: result.message })
        // Reset form
        setFormData({
          service: "",
          medecin: "",
          date: "",
          heure: "",
          prenom: "",
          nom: "",
          email: "",
          telephone: "",
          motif: "",
          honeypot: "",
        })
      } else {
        setMessage({ type: "error", text: result.error })
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableMedecins = formData.service ? medecins[formData.service as keyof typeof medecins] || [] : []

  return (
    <section id="reservation" className="py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">Réserver un Rendez-vous</h2>
          <p className="text-lg text-muted-foreground">
            Remplissez le formulaire ci-dessous pour demander un rendez-vous
          </p>
        </div>

        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Demande de Rendez-vous</CardTitle>
            <CardDescription className="text-muted-foreground">
              Tous les champs marqués d'un * sont obligatoires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => handleInputChange("honeypot", e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="service">Service médical *</Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medecin">Médecin *</Label>
                  <Select
                    value={formData.medecin}
                    onValueChange={(value) => handleInputChange("medecin", value)}
                    disabled={!formData.service}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisissez un médecin" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMedecins.map((medecin) => (
                        <SelectItem key={medecin} value={medecin}>
                          {medecin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date souhaitée *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heure">Heure souhaitée *</Label>
                  <Input
                    id="heure"
                    type="time"
                    value={formData.heure}
                    onChange={(e) => handleInputChange("heure", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motif">Motif de la consultation</Label>
                <Textarea
                  id="motif"
                  value={formData.motif}
                  onChange={(e) => handleInputChange("motif", e.target.value)}
                  placeholder="Décrivez brièvement le motif de votre consultation (optionnel)"
                  rows={3}
                />
              </div>

              {message && (
                <Alert
                  className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer la demande"
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-1">📋 Information importante</p>
                <p>La disponibilité exacte sera confirmée par l'hôpital. Vous recevrez une confirmation par email.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
