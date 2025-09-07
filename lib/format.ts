export function formatDateTimeDakar(date: Date, time: string): { dateDakar: string; heureDakar: string } {
  // Combine date and time
  const [hours, minutes] = time.split(":")
  const dateTime = new Date(date)
  dateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0)

  // Format for Africa/Dakar timezone
  const dateDakar = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateTime)

  const heureDakar = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateTime)

  return { dateDakar, heureDakar }
}
