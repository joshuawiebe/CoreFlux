# ⚡ Quick API Reference

## Context Hooks

### useTheme()
```jsx
import { useTheme } from '../context/ThemeContext';

{
  isDark,         // boolean - current theme
  toggleTheme,    // function - toggle theme
  setTheme        // function - set specific theme
}
```

**Example:**
```jsx
const { isDark, toggleTheme } = useTheme();
<button onClick={toggleTheme}>
  {isDark ? '☀️ Light' : '🌙 Dark'}
</button>
```

### useAuth()
```jsx
import { useAuth } from '../context/AuthContext';

{
  isLoggedIn,     // boolean
  user,           // {id, firstName, lastName, email, dateOfBirth, role, ...}
  signup,         // async (userData) => void
  login,          // async (email, password) => void
  logout,         // () => void
  user.id,        // User UUID
  user.role       // 'user' | 'technician' | 'installer'
}
```

**Example:**
```jsx
const { isLoggedIn, user, logout } = useAuth();
if (isLoggedIn) {
  console.log(`Hi ${user.firstName}!`);
  <button onClick={logout}>Logout</button>;
}
```

### useTranslation()
```jsx
import { useTranslation } from 'react-i18next';

{
  t,              // (key) => string - translation function
  i18n            // object with methods
}
```

**Example:**
```jsx
const { t, i18n } = useTranslation();
<p>{t('welcome.title')}</p>
<button onClick={() => i18n.changeLanguage('de')}>
  Deutsch
</button>
```

---

## Utility Functions

### Heating AI Integration
```jsx
import {
  getHeatingOptimization,
  predictHeatingNeeds,
  getTemperatureSchedule,
  calculateEfficiencyRating,
  detectHeatingIssues
} from '../utils/heatingAIIntegration';
```

#### getHeatingOptimization(heatingData)
```jsx
const optimization = await getHeatingOptimization({
  currentTemperature: 20,
  targetTemperature: 22,
  humidity: 45,
  weatehrData: {/* ... */}
});

// Returns: { recommendation, steps, savings }
```

#### calculateEfficiencyRating(heatingData)
```jsx
const rating = calculateEfficiencyRating({
  age: 5,                 // years
  efficiency: 90,         // percentage
  maintenanceCount: 3,    // times
  age: 5
});

// Returns: { score: 0-100, rating: 'Excellent'|'Good'|'Fair'|'Poor' }
```

#### detectHeatingIssues(heatingData)
```jsx
const issues = detectHeatingIssues({
  age: 10,
  lastServiced: '2023-01-01',
  powerConsumption: 5000
});

// Returns: [{ issue, severity: 'high'|'medium'|'low', action }]
```

#### getTemperatureSchedule()
```jsx
const schedule = getTemperatureSchedule();

// Returns: {
//   morning: 21,
//   daytime: 20,
//   evening: 22,
//   night: 18
// }
```

#### predictHeatingNeeds(weatherData)
```jsx
const prediction = predictHeatingNeeds({
  currentTemp: -5,
  humidity: 80,
  season: 'winter'
});

// Returns: { heatingLoad, estimatedCost, recommendation }
```

---

## Component Props

### SignupFormPro
```jsx
<SignupFormPro />
// No props needed - handles everything internally
// Uses: useAuth, useTheme, useNavigate
```

### HeatingAIAssistant
```jsx
<HeatingAIAssistant />
// Standalone component - no props required
// Features: settings panel, quick actions, chat history
```

### NavbarV2
```jsx
<NavbarV2 />
// Auto-detects user login status
// Shows different menus based on isLoggedIn
```

### LanguageSelector
```jsx
<LanguageSelector />
// Allows switching between 4 languages
// Auto-detects browser language on first load
```

---

## localStorage Keys

```javascript
// Theme
localStorage.getItem('theme-preference')    // 'dark' | 'light'

// Language
localStorage.getItem('language')            // 'en' | 'de' | 'fr' | 'es'

// User
localStorage.getItem('user')                // JSON string of user object

// App
localStorage.getItem('openrouter-key')      // API key (if set manually)
```

---

## CSS Classes

### Dark Mode Utilities
```jsx
// Apply dark mode
className="dark:bg-slate-900 dark:text-white"

// Conditional
className={isDark ? 'dark:bg-slate-900' : 'bg-white'}

// Dark mode base
// Applied to <html> element automatically
```

### Responsive Classes
```jsx
// Mobile-first
className="sm:flex md:grid lg:flex-row xl:flex-col"

// Breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Form Classes
```jsx
className="input-field"        // Full input styling
className="rounded-lg border"  // Basic styling
className="text-sm text-gray-600 dark:text-gray-300"
```

---

## Common Patterns

### Protected Route
```jsx
import PrivateRoute from '../components/PrivateRoute';

<Route
  path="/dashboard"
  element={<PrivateRoute><Dashboard /></PrivateRoute>}
/>
```

### DarkMode Conditional Styling
```jsx
const { isDark } = useTheme();

className={`
  rounded-lg p-4
  ${isDark 
    ? 'bg-slate-800 text-white border-slate-700' 
    : 'bg-white text-slate-900 border-gray-200'
  }
`}
```

### Translation with Variables
```jsx
const { t } = useTranslation();

// In JSON: "greeting": "Hello, {{name}}!"
t('greeting', { name: user.firstName })
```

### Animated Component
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Signup & Login
```jsx
const { signup } = useAuth();

const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'SecurePass123!',
  dateOfBirth: '1990-01-15',
  company: 'Acme Inc',
  phone: '+1234567890',
  address: '123 Main St',
  role: 'user' // or 'technician', 'installer'
};

await signup(userData);
// User is now logged in and saved to localStorage
```

---

## Event Handlers

### Theme Toggle
```jsx
import { useTheme } from '../context/ThemeContext';

const { toggleTheme } = useTheme();

<button onClick={toggleTheme}>Toggle Theme</button>
```

### Language Change
```jsx
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();

const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  // Auto-saves to localStorage
};

<button onClick={() => changeLanguage('de')}>Deutsch</button>
```

### Logout
```jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  logout();
  navigate('/login');
};

<button onClick={handleLogout}>Logout</button>
```

---

## Environment Variables

Create `.env.local`:
```bash
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.example.com
VITE_ENVIRONMENT=development
```

Access in code:
```jsx
const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## API Integration

### OpenRouter Chat Completion
```javascript
const response = await fetch(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4-turbo',
      messages: [
        { role: 'user', content: 'Optimize my heating...' }
      ],
      temperature: 0.7
    })
  }
);
```

---

## Debugging Tips

### Check Theme
```javascript
// In console:
console.log(document.documentElement.classList.contains('dark'));
console.log(localStorage.getItem('theme-preference'));
```

### Check Auth
```javascript
// In console:
console.log(JSON.parse(localStorage.getItem('user')));
```

### Check Language
```javascript
// In console:
console.log(localStorage.getItem('language'));
```

### View Component Props
```jsx
// In component:
console.table(props);
```

### Check API Response
```javascript
// Add to fetch:
.then(res => res.json())
.then(data => {
  console.log('API Response:', data);
  return data;
})
```

---

## Performance Tips

1. **Use useCallback for callbacks**
   ```jsx
   const handleClick = useCallback(() => {
     // function body
   }, [dependencies]);
   ```

2. **Use useMemo for expensive computations**
   ```jsx
   const value = useMemo(() => {
     return expensiveCalculation();
   }, [dependencies]);
   ```

3. **Lazy load routes**
   ```jsx
   const Dashboard = React.lazy(() => import('./Dashboard'));
   ```

4. **Use React.memo for static components**
   ```jsx
   export default React.memo(MyComponent);
   ```

---

## Testing Checklist

- [ ] Signup form all 4 steps
- [ ] Dark mode toggle
- [ ] Dark mode persists on reload
- [ ] Language switch (all 4 types)
- [ ] Language persists
- [ ] User stays logged in
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] AI chat loads
- [ ] Settings modal opens
- [ ] No console errors
- [ ] Performance acceptable

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Check for lint errors
npm run lint

# Format code
npm run format

# Install new package
npm install package-name

# Uninstall package
npm uninstall package-name

# Update all packages
npm update

# Clear cache
rm -rf node_modules && npm install
```

---

## Useful Imports

```javascript
// React
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Contexts
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

// i18n
import { useTranslation } from 'react-i18next';

// Animations
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { ChevronDown, Menu, X, Sun, Moon } from 'lucide-react';

// Utils
import {
  getHeatingOptimization,
  detectHeatingIssues
} from '../utils/heatingAIIntegration';
```

---

## Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [i18next](https://www.i18next.com)
- [Lucide Icons](https://lucide.dev)

---

**Last Updated:** February 2026  
**Version:** 1.0

This quick reference covers the most common usage patterns.
For detailed information, see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) 🚀
