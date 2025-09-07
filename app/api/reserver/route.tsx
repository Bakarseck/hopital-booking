import { type NextRequest, NextResponse } from "next/server"
import { formatDateTimeDakar, formatFullDateTimeDakar } from "@/lib/date-utils"

interface ReservationData {
  service: string
  medecin: string
  date: string
  heure: string
  prenom: string
  nom: string
  email: string
  telephone: string
  motif: string
  honeypot?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: ReservationData = await request.json()

    // Anti-spam honeypot check
    if (data.honeypot) {
      return NextResponse.json({ error: "Spam détecté" }, { status: 400 })
    }

    // Basic validation
    const requiredFields = ["service", "medecin", "date", "heure", "prenom", "nom", "email", "telephone"]
    for (const field of requiredFields) {
      if (!data[field as keyof ReservationData]) {
        return NextResponse.json({ error: `Le champ ${field} est requis` }, { status: 400 })
      }
    }

    // Create date object and format for Dakar timezone
    const appointmentDate = new Date(`${data.date}T${data.heure}`)
    const { dateDakar, heureDakar } = formatDateTimeDakar(appointmentDate)
    const fullDateTimeDakar = formatFullDateTimeDakar(appointmentDate)

    // Email 1: Admin notification
    const adminEmailData = {
      to: "babacaramar02@gmail.com",
      subject: `Nouveau RDV – ${data.service} – Dr ${data.medecin} – ${dateDakar} ${heureDakar}`,
      message: `
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Patient :</strong> ${data.prenom} ${data.nom}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.telephone}</p>
        <p><strong>Service :</strong> ${data.service}</p>
        <p><strong>Médecin :</strong> Dr ${data.medecin}</p>
        <p><strong>Date et heure (Africa/Dakar) :</strong> ${fullDateTimeDakar}</p>
        <p><strong>Motif :</strong> ${data.motif || "Non spécifié"}</p>
        <hr>
        <p><em>Demande reçue le ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Dakar" })}</em></p>
      `,
    }

    // Email 2: Patient confirmation
    const patientEmailData = {
      to: data.email,
      subject: `Confirmation de votre demande – ${data.service} – ${dateDakar} ${heureDakar}`,
      message: `
        <h2>Confirmation de votre demande de rendez-vous</h2>
        <p>Bonjour ${data.prenom} ${data.nom},</p>
        <p>Nous avons bien reçu votre demande de rendez-vous :</p>
        <ul>
          <li><strong>Service :</strong> ${data.service}</li>
          <li><strong>Médecin :</strong> Dr ${data.medecin}</li>
          <li><strong>Date et heure souhaitées :</strong> ${fullDateTimeDakar}</li>
          <li><strong>Motif :</strong> ${data.motif || "Non spécifié"}</li>
        </ul>
        <p><strong>Important :</strong> Cette demande sera confirmée par notre équipe. Nous vous contacterons rapidement pour valider la disponibilité et finaliser votre rendez-vous.</p>
        <hr>
        <p><strong>Contact :</strong></p>
        <p>Email : babacaramar02@gmail.com</p>
        <p>Téléphone : +33 7 73 33 98 35</p>
        <p>Fuseau horaire : Africa/Dakar</p>
        <br>
        <p>Merci de votre confiance.</p>
      `,
    }

    // Send both emails
    const [adminResponse, patientResponse] = await Promise.all([
      fetch("https://codingmailer.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminEmailData),
      }),
      fetch("https://codingmailer.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientEmailData),
      }),
    ])

    if (!adminResponse.ok || !patientResponse.ok) {
      throw new Error("Erreur lors de l'envoi des emails")
    }

    return NextResponse.json({
      success: true,
      message: "Votre demande a été envoyée avec succès. Vous recevrez une confirmation par email.",
    })
  } catch (error) {
    console.error("Erreur API:", error)
    return NextResponse.json(
      {
        error: "Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer.",
      },
      { status: 500 },
    )
  }
}
