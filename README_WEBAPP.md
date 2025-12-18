# CoreFlux - AI Heating Network Demo

Eine vollständig im Frontend laufende Demo-Webapp für ein dezentrales KI-Heizwerk. Perfekt für Schulprojekte!

## 🚀 Features

✅ **Landing Page** - Beeindruckende Startseite mit Hero-Section  
✅ **Frontend-only Login** - Keine Datenbank, nur Fake-Credentials  
✅ **Dashboard** - Animierte Graphen mit Echtzeit-Simulationen  
✅ **Geräteübersicht** - Verwalte deine Heizungen (Raspberry Pi Cluster)  
✅ **Admin Panel** - Exklusive Admin-Statistiken und Verwaltung  
✅ **Einstellungsseite** - Benutzerprofil und Präferenzen  
✅ **Team & Impressum** - Vollständige Informationsseiten  
✅ **Neon Dark Theme** - Futuristisches CoreFlux-Design  
✅ **Mobile-responsive** - Funktioniert auf allen Geräten  
✅ **Smooth Animations** - Transitions, Übergänge, floating Effects  

## 🎯 Fake-Login Credentials

```
admin / admin123    (Admin-Zugriff)
user / user123      (User-Zugriff)
demo / demo123      (Demo-Zugriff)
```

## 🛠️ Installation

```bash
# Dependencies installieren
npm install

# Dev-Server starten
npm run dev

# Production build erstellen
npm run build
```

## 📁 Projekt-Struktur

```
src/
├── pages/
│   ├── Landing.jsx          # Startseite
│   ├── Login.jsx            # Login-Seite
│   ├── Dashboard.jsx        # Hauptdashboard mit Graphen
│   ├── DeviceOverview.jsx   # Geräteübersicht
│   ├── AdminPanel.jsx       # Admin-Dashboard
│   ├── Settings.jsx         # Einstellungsseite
│   ├── Team.jsx             # Team-Seite
│   └── Impressum.jsx        # Impressum
├── components/
│   ├── Navbar.jsx           # Navigation
│   └── PrivateRoute.jsx     # Login-Schutz
├── context/
│   └── AuthContext.jsx      # Authentication (Frontend)
├── utils/
│   └── mockData.js          # Fake-Daten und Simulationen
├── App.jsx                  # Router & Layout
├── main.jsx                 # Entry Point
└── index.css               # Tailwind + Custom CSS
```

## 🎨 Design-Features

- **Neon Color Scheme**: Cyan, Pink, Purple, Green
- **Dark Theme**: Gradient-Hintergründe
- **Animations**: Float, Slide-in, Fade-in, Pulse-glow
- **Responsive**: Mobile, Tablet, Desktop
- **Interactive Cards**: Hover-Effects, Scale-Transforms

## 📊 Simulierte Daten

- **AI-Anfragen**: Live-Updates alle 3 Sekunden
- **Temperaturverlauf**: Realistische Wärmekurven
- **Stromverbrauch**: Watt-Messungen pro Geräte
- **Geräte-Status**: Online/Offline mit Statistiken
- **Benutzer-Verwaltung**: Fake-Userdatenbank

## 🔐 Frontend-only Security

⚠️ **WICHTIG**: Dies ist eine Demo für Schulprojekte!
- Alle Login-Daten sind im Frontend gespeichert
- Keine Verschlüsselung
- Alle Daten sind Fake-Daten
- Nur zum Demonstrieren gedacht!

## 🚀 Performance

- ⚡ Vite für ultra-schnelle Entwicklung
- 📦 React 18 mit Hooks
- 🎨 Tailwind CSS für schnelle Styling
- 📈 Recharts für animierte Graphen
- 🔄 Real-time Simulationen (Browser-basiert)

## 📱 Mobile Version

✅ Vollständig responsive  
✅ Touch-freundliche Navigation  
✅ Optimierte Charts für kleine Bildschirme  
✅ Mobile Menu mit Hamburger-Icon

## 🎓 Perfekt für

- 🏫 Schulprojekte
- 📚 IT-Unterricht
- 💻 Frontend-Demonstrationen
- 🚀 Portfolio-Projekte
- 🎯 Prototyping

## 📝 Lizenz

© 2024 CoreFlux. Demo-Version.

---

**Viel Spaß mit deinem CoreFlux-Projekt!** 🚀✨
