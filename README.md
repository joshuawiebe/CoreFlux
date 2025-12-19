# 🔥 CoreFlux - The Smart Energy Solution

Modern web application for intelligent heating management and AI-powered energy optimization.

## ✨ Features

### 🏠 Public Pages
- **Landing Page** - Hero section with animated features and call-to-actions
- **Heating Shop** (`/heizungen`) - Browse & purchase intelligent heating systems
- **AI Marketplace** (`/ki`) - Explore AI-powered optimization plans
- **Pricing** - Flexible pricing tiers
- **Login/Auth** - Secure user authentication

### 🎯 Protected Features (Logged-in Users)
- **Dashboard** - Real-time system monitoring and analytics
- **Device Overview** - Manage connected heating devices
- **Settings** - User preferences, language, theme, notifications
- **Admin Panel** - System administration (admin only)

### 🤖 AI Assistant
- Floating AI chat widget
- Smart recommendations
- Real-time responses
- Contextual energy insights

### 🌍 Internationalization
- 4 languages: German (de), English (en), French (fr), Spanish (es)
- Dynamic language switching
- Persistent language preference
- Full translation coverage

### 🎨 Design Features
- Dark/Light mode toggle
- Responsive design (mobile, tablet, desktop)
- Smooth animations & transitions
- Tailwind CSS styling
- Accessibility-focused

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation & Running
```bash
# Clone repository
git clone https://github.com/gustavmanfred/CoreFlux.git
cd CoreFlux

# Install dependencies
npm install

# Start development server
npm run dev
```

App will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
CoreFlux/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── SettingsModal.jsx # Settings interface
│   │   ├── LanguageSelector.jsx
│   │   ├── AIChat.jsx       # AI chat widget
│   │   └── PrivateRoute.jsx # Auth guard
│   ├── pages/               # Page components
│   │   ├── Landing.jsx      # Home page
│   │   ├── Login.jsx        # Auth page
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── Heizungen.jsx    # Heating products
│   │   ├── KIMarketplace.jsx # AI plans
│   │   ├── Settings.jsx
│   │   ├── DeviceOverview.jsx
│   │   ├── AdminPanel.jsx
│   │   └── ...
│   ├── context/             # React Context
│   │   ├── AuthContext.jsx  # Auth state
│   │   ├── ThemeContext.jsx # Dark mode
│   │   ├── SettingsContext.jsx
│   │   └── ToastContext.jsx
│   ├── i18n/                # Internationalization
│   │   ├── config.js        # i18next config
│   │   └── locales/         # Translation files
│   │       ├── de.json
│   │       ├── en.json
│   │       ├── fr.json
│   │       └── es.json
│   ├── utils/               # Utilities
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── node_modules/            # Dependencies
├── package.json             # Dependencies list
├── vite.config.js           # Vite config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
└── index.html               # HTML template
```

## 🔧 Technology Stack

- **Frontend**: React 18.2.0
- **Build**: Vite 5.0.0
- **Routing**: React Router 6.20.0
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Lucide React 0.294.0
- **Charts**: Recharts 2.10.0
- **i18n**: i18next 23.7.0 (custom stubs)
- **State Management**: React Context API

## 🎨 Theme System

The app supports light and dark modes:
- **Auto Detection**: Checks system preference (`prefers-color-scheme`)
- **Manual Toggle**: Button in navbar to switch modes
- **Persistence**: Theme preference saved to localStorage
- **CSS Class**: Dark mode uses `.dark` class selector

## 🌐 Internationalization

### Add New Translation
1. Update all JSON files in `src/i18n/locales/`
2. Use key paths like: `t('section.key')`
3. Language automatically updates across the app

### Supported Languages
- 🇩🇪 Deutsch (German)
- 🇬🇧 English
- 🇫🇷 Français (French)
- 🇪🇸 Español (Spanish)

## 🔐 Authentication

### Features
- Email/password login
- Local storage persistence
- Auto-redirect for protected routes
- Logout functionality
- Role-based access (admin)

### Demo User
- Email: `demo@example.com`
- Password: `demo123`

## 📱 Responsive Design

- **Mobile** (< 640px): Stack layout, mobile menu
- **Tablet** (640px - 1024px): Flexible grid
- **Desktop** (> 1024px): Full layout with sidebars

## 🧪 Testing

Run development server and visit:
- `/` - Landing page
- `/login` - Login page
- `/pricing` - Pricing page
- `/heizungen` - Heating products
- `/ki` - AI marketplace
- `/dashboard` - Dashboard (protected)
- `/settings` - Settings (protected)
- `/admin` - Admin panel (admin only)

## 📊 Performance

- Code splitting via Vite
- Lazy loading for routes
- Image optimization
- CSS purging with Tailwind
- Fast refresh with HMR

## 🐛 Troubleshooting

### App not rendering
- Check browser console for errors
- Verify all dependencies installed: `npm install`
- Clear `.next` cache: `rm -rf node_modules && npm install`

### Translations not showing
- Ensure translation keys exist in JSON files
- Check browser language setting
- Verify localStorage not blocking i18n

### Styling issues
- Clear Tailwind cache: `npm run dev` force rebuild
- Check dark mode class on `<html>` element

## 📝 License

MIT License - See [LICENSE](LICENSE) file

## 🤝 Contributing

1. Create feature branch
2. Commit changes
3. Push to branch
4. Open pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ by GustavManfred**
