// Utility functions for Africa/Dakar timezone formatting
export function formatDateTimeDakar(date: Date): { dateDakar: string; heureDakar: string } {
  // Africa/Dakar is UTC+0 year-round
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    hour: "2-digit",
    minute: "2-digit",
  })

  return {
    dateDakar: formatter.format(date),
    heureDakar: timeFormatter.format(date),
  }
}

export function formatFullDateTimeDakar(date: Date): string {
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return formatter.format(date)
}
