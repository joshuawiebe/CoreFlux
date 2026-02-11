# 📚 Complete File Reference Index

## 📖 How to Use This Guide

This file provides a complete map of the CoreFlux project structure with descriptions of every important file's purpose and location. Use this as a navigation guide.

---

## 📋 Documentation Files

### Getting Started
- **[README.md](./README.md)** - Project overview and main documentation
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** - Quick start guide (recommended first read)
- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** - Quick reference for developers
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current status and completion checklist
- **[FILE_INDEX.md](./FILE_INDEX.md)** - This file

### Design & Concept
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design standards and color palette
- **[Concept.md](./Concept.md)** - Original project vision
- **[IMPROVEMENTS.md](./IMPROVEMENTS.md)** - Improvement suggestions
- **[IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)** - Technical implementation details

---

## ⚙️ Configuration Files

### Build & Package Management
| File | Purpose |
|------|---------|
| **package.json** | Dependencies, scripts, project metadata |
| **package-lock.json** | Locked dependency versions |
| **vite.config.js** | Vite build configuration |
| **tsconfig.json** | TypeScript configuration |
| **tsconfig.node.json** | TypeScript config for build files |

### Styling & Processing
| File | Purpose |
|------|---------|
| **tailwind.config.js** | Tailwind CSS configuration with dark mode |
| **postcss.config.js** | PostCSS plugin configuration |

### Web Entry
| File | Purpose |
|------|---------|
| **index.html** | Main HTML file - app container |
| **.gitignore** | Git ignore patterns |
| **LICENSE** | Project license |

---

## 📂 Source Directory Structure

### Root Entry Point
```
src/
├── main.jsx          ← Application entry point (ReactDOM.createRoot)
├── App.jsx           ← Root component with routing
└── index.css         ← Global styles and Tailwind imports
```

### Context & State Management
```
src/context/
├── ThemeContext.jsx       ← Dark/light mode management + system detection
├── AuthContext.jsx        ← User authentication & profile management
├── ModelsContext.jsx      ← AI model selection
├── SettingsContext.jsx    ← User settings
└── ToastContext.jsx       ← Notification system
```

### Components Directory

#### Authentication & Forms
```
src/components/
├── SignupFormPro.jsx            ← 4-step signup form [CORE]
├── SignupForm.jsx               ← Alternative signup form
├── APIKeySetup.jsx              ← OpenRouter API configuration
├── LanguageSelector.jsx         ← Language switcher component
└── CookieConsent.jsx            ← Cookie consent modal
```

#### Navigation & Layout
```
src/components/
├── Navbar.jsx                   ← Original navigation bar
├── NavbarV2.jsx                 ← Enhanced navbar with user menu [CURRENT]
└── ProfessionalPageTemplate.jsx ← Page template wrapper
```

#### AI & Chat
```
src/components/
├── AIChat.jsx                   ← AI chat interface
├── ChatGPTStyleChat.jsx         ← ChatGPT-style chat UI
├── EnhancedAIChat.jsx           ← Enhanced AI component
├── RealAIChat.jsx               ← Real-time AI chat
├── EmbeddedChat.jsx             ← Embedded chat widget
├── EmbeddedAIChat.jsx           ← Alternative embedded chat
├── ProfessionalAIApp.jsx        ← Professional AI interface
└── HeatingAIAssistant.jsx       ← Heating system AI [NEW]
```

#### Landing & Marketing
```
src/components/
├── LandingHero.jsx              ← Hero section v1
├── LandingHeroV2.jsx            ← Hero section v2
├── BenefitsGrid.jsx             ← Benefits showcase
├── FeaturesSection.jsx          ← Features grid
├── HowItWorks.jsx               ← How it works section
├── HowItWorksSection.jsx        ← Alternative how-it-works
├── PricingSection.jsx           ← Pricing display
├── WhereIsCoreFlux.jsx          ← Service areas section
└── LandingFooter.jsx            ← Footer component
```

#### Settings & UI
```
src/components/
├── SettingsModal.jsx            ← User settings modal
├── AISettingsModal.jsx          ← AI configuration modal
├── ServiceSelection.jsx         ← Service type selector
├── AppointmentBooking.jsx       ← Booking component
├── Reveal.jsx                   ← Scroll reveal effect
├── LoadingAnimation.jsx         ← Loading spinner
└── PrivateRoute.jsx             ← Route protection component
```

#### Business Logic Components
```
src/components/
├── ProfessionalLanding.jsx      ← Professional landing page
├── ProfessionalFooter.jsx       ← Professional footer
├── Intro.jsx                    ← Introduction section
└── [Other layout components]
```

### Pages Directory

#### Core Pages
```
src/pages/
├── Login.jsx                    ← Login page
├── Signup.jsx                   ← Simple signup page
├── SignupPagePro.jsx            ← Professional signup (wraps SignupFormPro)
├── Dashboard.jsx                ← Main dashboard [CURRENT]
├── DashboardV2.jsx              ← Alternative dashboard
├── Dashboard_old.jsx            ← Deprecated dashboard
└── Landing.jsx                  ← Main landing page
```

#### Alternative Versions
```
src/pages/
├── Landing_old.jsx              ← Deprecated landing
├── LandingNew.jsx               ← New landing variant
├── Pricing.jsx                  ← Pricing page [CURRENT]
├── Pricing_old.jsx              ← Deprecated pricing
├── SettingsV2.jsx               ← User settings v2
└── Settings.jsx                 ← User settings
```

#### Feature Pages
```
src/pages/
├── AIChat.jsx                   ← AI chat page wrapper
├── AIChatPage.jsx               ← AI chat implementation
├── DeviceOverview.jsx           ← Device management page
├── Heizungen.jsx                ← Heating management (German)
├── KIMarketplace.jsx            ← AI marketplace
├── Team.jsx                     ← Team management
├── AdminPanel.jsx               ← Admin controls
└── Checkout.jsx                 ← Payment checkout
```

#### Legal Pages
```
src/pages/
├── Privacy.jsx                  ← Privacy policy
└── Impressum.jsx                ← Imprint/Legal notice
```

### Utilities & Helpers

#### Core Utilities
```
src/utils/
├── heatingAIIntegration.js      ← Heating AI logic & OpenRouter API [NEW]
├── storageManager.js            ← localStorage helper functions
└── mockData.js                  ← Development mock data
```

### Internationalization
```
src/i18n/
├── config.js                    ← i18next configuration & language detection
└── locales/
    ├── en.json                  ← English translations
    ├── de.json                  ← German translations (Deutsch)
    ├── de.json.backup           ← German backup
    ├── fr.json                  ← French translations
    └── es.json                  ← Spanish translations (Español)
```

### Assets & Logos
```
logos/                           ← PNG/SVG logo files
src/assets/                      ← Image assets directory
```

---

## 🗂️ File Dependencies Map

### Entry Point Flow
```
main.jsx
  └── App.jsx
      ├── ThemeProvider (ThemeContext)
      ├── AuthProvider (AuthContext)
      ├── ModelsProvider (ModelsContext)
      └── BrowserRouter
          └── Routes & Pages
```

### Authentication Flow
```
SignupFormPro.jsx (4-step form)
  └── useAuth() from AuthContext
      └── localStorage: 'user' key
```

### Theme Flow
```
ThemeContext.jsx
  ├── localStorage: 'theme-preference' key
  ├── Media query listener (light/dark)
  ├── document.documentElement.classList
  └── All components use useTheme()
```

### Language Flow
```
LanguageSelector.jsx
  └── i18n.changeLanguage()
      └── localStorage: 'language' key
          └── Loads from src/i18n/locales/*.json
```

### AI Integration Flow
```
HeatingAIAssistant.jsx
  └── heatingAIIntegration.js
      ├── getHeatingOptimization() → OpenRouter API
      ├── detectHeatingIssues() → Local algorithms
      └── localStorage: 'openrouter-key'
```

---

## 📊 Component Hierarchy

### Page Structure Example
```
App.jsx (Root)
├── Login.jsx / Signup.jsx (Public)
├── PrivateRoute (Protected)
│   └── Dashboard.jsx
│       ├── NavbarV2.jsx
│       ├── Sidebar
│       └── MainContent
└── Error Pages
```

### Form Component Structure
```
SignupFormPro.jsx
├── Step 1: PersonalInfo (firstName, lastName, email)
├── Step 2: Password (strength checker, requirements)
├── Step 3: DateOfBirth (date picker, company, role)
├── Step 4: Review (summary, confirmation)
└── ProgressBar (visual indicator)
```

---

## 🔑 Key File Modifications Summary

| File | Status | Lines | Key Changes |
|------|--------|-------|-------------|
| ThemeContext.jsx | ✅ Rewritten | 120 | Media query + class toggle |
| AuthContext.jsx | ✅ Enhanced | 85 | 8+ user fields |
| SignupFormPro.jsx | ✅ Rebuilt | 830 | 4-step form |
| NavbarV2.jsx | ✅ Redesigned | 250 | User menu, responsive |
| index.css | ✅ Fixed | 200 | Dark mode support |
| heatingAIIntegration.js | ✅ NEW | 430 | OpenRouter integration |
| HeatingAIAssistant.jsx | ✅ NEW | 400 | AI chat interface |

---

## 🎯 Quick Navigation by Task

### I need to...

#### Modify User Registration
→ `src/components/SignupFormPro.jsx` (signup form)  
→ `src/context/AuthContext.jsx` (auth logic)  
→ `src/pages/SignupPagePro.jsx` (page wrapper)

#### Change Dark Mode Behavior
→ `src/context/ThemeContext.jsx` (theme logic)  
→ `tailwind.config.js` (Tailwind config)  
→ `src/index.css` (global styles)

#### Add New Language
→ `src/i18n/locales/` (create new JSON file)  
→ `src/i18n/config.js` (add to config)  
→ `src/components/LanguageSelector.jsx` (add option)

#### Modify Navbar
→ `src/components/NavbarV2.jsx` (navbar component)  
→ `src/pages/` (pages that use navbar)

#### Update AI Features
→ `src/utils/heatingAIIntegration.js` (AI logic)  
→ `src/components/HeatingAIAssistant.jsx` (UI)  

#### Change Global Styling
→ `src/index.css` (edit global styles)  
→ `tailwind.config.js` (Tailwind configuration)

#### Add New Page
→ `src/pages/NewPage.jsx` (create page)  
→ `src/App.jsx` (add route)  
→ `src/components/NavbarV2.jsx` (add navigation link)

#### Modify Authentication
→ `src/context/AuthContext.jsx` (auth logic)  
→ `src/components/PrivateRoute.jsx` (protection)

#### Update Translations
→ `src/i18n/locales/[language].json` (translation files)

#### Change Colors/Branding
→ `tailwind.config.js` (color definitions)  
→ `src/index.css` (CSS custom properties)  
→ `DESIGN_SYSTEM.md` (design standards)

---

## 📋 Standard File Templates

### New Component Template
```jsx
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function NewComponent() {
  const { isDark } = useTheme();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <motion.div className={isDark ? 'dark' : ''}>
      {/* Component content */}
    </motion.div>
  );
}
```

### New Page Template
```jsx
import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import NavbarV2 from '../components/NavbarV2';

export default function NewPage() {
  return (
    <PrivateRoute>
      <NavbarV2 />
      <main className="pt-20">
        {/* Page content */}
      </main>
    </PrivateRoute>
  );
}
```

### New i18n Entry Template
```json
{
  "newFeature": {
    "title": "Feature Title",
    "description": "Feature description",
    "button": "Click me"
  }
}
```

---

## 🔄 File Update Sequence

If modifying multiple related files, follow this order:

1. **Update Logic** → `src/context/*.jsx` (state management)
2. **Update Components** → `src/components/*.jsx` (UI)
3. **Update Pages** → `src/pages/*.jsx` (page integration)
4. **Update Styles** → `src/index.css` (styling)
5. **Update Translations** → `src/i18n/locales/*.json`
6. **Update Routing** → `src/App.jsx` (if needed)
7. **Test & Verify** → `npm run dev` (local testing)

---

## ✅ Testing File Locations

### Test Each Feature
| Feature | Main File | Related Files |
|---------|-----------|---------------|
| Dark Mode | ThemeContext.jsx | index.css, tailwind.config.js |
| Language | LanguageSelector.jsx | i18n/config.js, i18n/locales/* |
| Auth | AuthContext.jsx | SignupFormPro.jsx, PrivateRoute.jsx |
| Navigation | NavbarV2.jsx | App.jsx, pages/* |
| AI Chat | HeatingAIAssistant.jsx | heatingAIIntegration.js |

---

## 🚀 Deployment Checklist

Files to review before deployment:
- [ ] `.env.local` - Set production API keys
- [ ] `vite.config.js` - Production build settings
- [ ] `tailwind.config.js` - All colors defined
- [ ] `src/i18n/config.js` - All languages configured
- [ ] `package.json` - Correct version number
- [ ] `src/App.jsx` - All routes configured
- [ ] `index.html` - Meta tags and favicon

---

## 📞 File Help Quick Links

Need help with a specific file?

| File Type | Related Docs |
|-----------|------|
| Context files | See DEVELOPER_GUIDE.md "State Management" |
| Components | See DEVELOPER_GUIDE.md "Common Patterns" |
| Styling | See DESIGN_SYSTEM.md |
| Translations | See IMPROVEMENTS_SUMMARY.md "Internationalization" |
| AI features | See IMPROVEMENTS_SUMMARY.md "Heating AI Integration" |

---

## 🎓 Learning Path

### For New Developers:
1. Read GETTING_STARTED.md
2. Review src/App.jsx
3. Study ThemeContext.jsx
4. Examine SignupFormPro.jsx
5. Look at NavbarV2.jsx
6. Check heatingAIIntegration.js

### For Designers:
1. Review DESIGN_SYSTEM.md
2. Check tailwind.config.js
3. Examine src/index.css
4. Study component styling in src/components/

### For DevOps:
1. Review package.json
2. Check vite.config.js
3. Examine tailwind.config.js
4. Look at .env.local requirements

---

## 📈 Project Growth

### Core Files (Essential)
- ✅ src/App.jsx
- ✅ src/main.jsx
- ✅ src/context/ThemeContext.jsx
- ✅ src/context/AuthContext.jsx
- ✅ src/components/NavbarV2.jsx
- ✅ src/components/SignupFormPro.jsx

### Feature Files (Important)
- ✅ src/components/HeatingAIAssistant.jsx
- ✅ src/utils/heatingAIIntegration.js
- ✅ src/i18n/config.js

### Support Files (Helpful)
- ✅ tailwind.config.js
- ✅ src/context/ModelsContext.jsx
- ✅ src/components/LanguageSelector.jsx

### Optional Files (Nice-to-have)
- ℹ️ src/context/SettingsContext.jsx
- ℹ️ src/context/ToastContext.jsx
- ℹ️ src/utils/storageManager.js

---

**Last Updated:** February 2026  
**Version:** 1.0  
**Total Files:** 50+  
**Core Modified Files:** 6  
**New Files Created:** 3  

For more information, see the relevant documentation files listed at the top of this guide.
