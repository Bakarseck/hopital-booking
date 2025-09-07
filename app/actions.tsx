"use server"

import { formatDateTimeDakar } from "@/lib/format"

export async function reserveAction(formData: FormData) {
  // Extract form data
  const service = formData.get("service") as string
  const medecin = formData.get("medecin") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const prenom = formData.get("prenom") as string
  const nom = formData.get("nom") as string
  const email = formData.get("email") as string
  const telephone = formData.get("telephone") as string
  const motif = formData.get("motif") as string

  // Basic validation
  if (!service || !medecin || !date || !time || !prenom || !nom || !email || !telephone) {
    return { ok: false, error: "Tous les champs obligatoires doivent être remplis." }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { ok: false, error: "Veuillez saisir une adresse email valide." }
  }

  try {
    // Format date and time for Dakar timezone
    const appointmentDate = new Date(date)
    const { dateDakar, heureDakar } = formatDateTimeDakar(appointmentDate, time)

    // Email for admin
    const adminEmailData = {
      to: "seck.bakar@ugb.edu.sn",
      subject: `Nouveau RDV – ${service} – Dr ${medecin} – ${dateDakar} ${heureDakar}`,
      message: `
        <h2>Nouvelle demande de rendez-vous</h2>
        <p><strong>Patient :</strong> ${prenom} ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone}</p>
        <p><strong>Service :</strong> ${service}</p>
        <p><strong>Médecin :</strong> Dr ${medecin}</p>
        <p><strong>Date et heure (Africa/Dakar) :</strong> ${dateDakar} à ${heureDakar}</p>
        <p><strong>Motif :</strong> ${motif || "Non spécifié"}</p>
      `,
    }

    // Email for patient
    const patientEmailData = {
      to: email,
      subject: `Confirmation de votre demande – ${service} – ${dateDakar} ${heureDakar}`,
      message: `
        <h2>Confirmation de votre demande de rendez-vous</h2>
        <p>Bonjour ${prenom} ${nom},</p>
        <p>Nous avons bien reçu votre demande de rendez-vous :</p>
        <ul>
          <li><strong>Service :</strong> ${service}</li>
          <li><strong>Médecin :</strong> Dr ${medecin}</li>
          <li><strong>Date et heure souhaitées :</strong> ${dateDakar} à ${heureDakar}</li>
        </ul>
        <p>Notre équipe vous contactera prochainement par email ou téléphone pour confirmer définitivement votre rendez-vous.</p>
        <p><strong>Nos coordonnées :</strong></p>
        <p>Email : babacaramar02@gmail.com<br>
        Téléphone : +33 7 73 33 98 35</p>
        <p>Merci de votre confiance.</p>
      `,
    }

    // Send admin email
    const adminResponse = await fetch("https://codingmailer.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminEmailData),
    })

    if (!adminResponse.ok) {
      return { ok: false, error: "Erreur lors de l'envoi de l'email à l'administration." }
    }

    // Send patient email
    const patientResponse = await fetch("https://codingmailer.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientEmailData),
    })

    if (!patientResponse.ok) {
      return { ok: false, error: "Erreur lors de l'envoi de l'email de confirmation." }
    }

    return { ok: true }
  } catch (error) {
    console.error("Error sending emails:", error)
    return { ok: false, error: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer." }
  }
}
