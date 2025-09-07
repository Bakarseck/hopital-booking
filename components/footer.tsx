export function Footer() {
  return (
    <footer className="bg-foreground text-background py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Hôpital Central</h3>
          <p className="text-background/80">Votre santé, notre priorité</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>babacaramar02@gmail.com</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>+33 7 73 33 98 35</span>
          </div>
          <div className="hidden md:block">•</div>
          <div className="flex items-center gap-2">
            <span>🌍</span>
            <span>Fuseau horaire : Africa/Dakar</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-background/20 text-xs text-background/60">
          <p>&copy; 2024 Hôpital Central. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
