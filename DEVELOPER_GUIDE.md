# 🔧 Developer Quick Reference Guide

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Format code
npm run format
```

---

## Component Quick Access

### Theme & Styling
```jsx
// Dark mode
import { useTheme } from '../context/ThemeContext';
const { isDark, toggleTheme } = useTheme();

// Responsive classes
className="hidden sm:block md:flex lg:grid xl:flex-col"
```

### Internationalization
```jsx
import { useTranslation } from 'react-i18next';
const { i18n, t } = useTranslation();
i18n.changeLanguage('de'); // Change language
t('key.path') // Get translation
```

### Authentication
```jsx
import { useAuth } from '../context/AuthContext';
const { isLoggedIn, user, signup, login, logout } = useAuth();
```

### Heating AI
```jsx
import {
  getHeatingOptimization,
  predictHeatingNeeds,
  getTemperatureSchedule,
  calculateEfficiencyRating,
  detectHeatingIssues
} from '../utils/heatingAIIntegration';
```

---

## Common Patterns

### Form Input with Dark Mode
```jsx
const inputClass = `w-full px-4 py-3 rounded-lg
  ${isDark 
    ? 'bg-slate-700 border-slate-600 text-white' 
    : 'bg-white border-slate-300 text-slate-900'
  } border focus:ring-2 focus:ring-brand-primary`;

<input className={inputClass} />
```

### Conditional Dark Mode Styling
```jsx
className={`rounded-lg ${
  isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
}`}
```

### Protected Routes
```jsx
import PrivateRoute from '../components/PrivateRoute';

<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

### Animations
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

---

## Color Palette

```css
/* Brand Colors */
#0066CC - Primary Blue
#004399 - Dark Blue
#0099FF - Light Blue

/* Status Colors */
#22c55e - Success Green
#ef4444 - Error Red
#f59e0b - Warning Amber
#3b82f6 - Info Blue

/* Neutrals */
#ffffff - White
#f5f5f5 - Light Gray
#000000 - Black
#1a1a1a - Dark Gray
```

---

## Tailwind Utility Classes

### Spacing
```
m-4      margin
p-4      padding
gap-4    gap between flex items
w-full   100% width
h-screen full screen height
```

### Dark Mode
```
dark:bg-slate-900      applies in dark mode
dark:text-white
dark:border-slate-700
```

### Responsiveness
```
sm: (640px)
md: (768px)  
lg: (1024px)
xl: (1280px)
2xl: (1536px)
```

### Flexbox
```
flex           display: flex
justify-center align horizontally
items-center   align vertically
gap-4          space between items
flex-1         flex-grow: 1
```

### Grid
```
grid
grid-cols-1    single column
grid-cols-2    two columns
gap-4          space between items
```

---

## File Locations Reference

### Config Files
- `.env.local` - Environment variables
- `tailwind.config.js` - Tailwind configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.js` - Vite configuration

### Source Structure
```
src/
├── components/      Reusable components
├── context/         React Context providers
├── i18n/            Internationalization
├── pages/           Page components
├── utils/           Utility functions
├── assets/          Images and static files
├── App.jsx          Main app component
└── main.jsx         Entry point
```

---

## State Management Quick Examples

### Managing User Session
```jsx
const { user, isLoggedIn, logout } = useAuth();

useEffect(() => {
  if (isLoggedIn) {
    console.log(`User: ${user.firstName} ${user.lastName}`);
  }
}, [isLoggedIn, user]);
```

### Theme Switching with Effect
```jsx
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [isDark]);
```

### Language Change
```jsx
const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem('language', lang);
};
```

---

## Testing Quick Checks

### Test Dark Mode
```javascript
// Open console and run:
localStorage.setItem('theme-preference', 'dark');
location.reload();
```

### Test Language
```javascript
// Open console and run:
localStorage.setItem('language', 'de');
location.reload();
```

### Test Authentication
```javascript
// Simulate login in console:
localStorage.setItem('user', JSON.stringify({
  id: 'test',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
}));
location.reload();
```

---

## Performance Tips

1. **Code Splitting** - Use React.lazy() for large components
```jsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

2. **Memoization** - Prevent unnecessary re-renders
```jsx
const MemoComponent = React.memo(MyComponent);
```

3. **useCallback** - Memoize callback functions
```jsx
const handleClick = useCallback(() => {
  // ...
}, [dependency]);
```

4. **useMemo** - Memoize expensive calculations
```jsx
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue();
}, [dependency]);
```

---

## Debugging Tips

### React DevTools
Install the React DevTools browser extension for component inspection

### Check Component Props
```jsx
console.table(props);
```

### Log Context Values
```jsx
const { isDark } = useTheme();
console.log('isDark:', isDark);
```

### Network Debugging
Check Network tab in DevTools to verify API calls

### LocalStorage Inspection
```javascript
// View all stored data
console.table(localStorage);

// Clear all data
localStorage.clear();
```

---

## Common Errors & Solutions

| Error | Solution |
|-------|----------|
| "useTheme must be used within ThemeProvider" | Wrap component tree with ThemeProvider |
| "Cannot read property 'isDark' of undefined" | Ensure component is inside Context provider |
| "Module not found" | Check import paths are relative correctly |
| "classname is not defined" | Make sure to use className (not classname) |
| "Cannot find module 'lucide-react'" | Run npm install |

---

## Browser DevTools Shortcuts

- `F12` or `Cmd+Option+I` - Open DevTools
- `Cmd+Shift+K` (Mac) / `Ctrl+Shift+K` (Windows) - Focus console
- `Cmd+Option+U` (Mac) / `Ctrl+Shift+U` (Windows) - View source
- `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows) - Open console

---

## Useful Snippets

### Check if user is logged in
```jsx
const { isLoggedIn } = useAuth();
if (!isLoggedIn) return <Navigate to="/login" />;
```

### Get current theme
```jsx
const isDark = localStorage.getItem('theme-preference') === 'dark';
```

### Get current language
```jsx
const language = localStorage.getItem('language') || 'en';
```

### Format date
```jsx
new Date(dateString).toLocaleDateString('de-DE');
```

### Format currency
```jsx
new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR'
}).format(amount);
```

---

## Links & Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev
- **React Router:** https://reactrouter.com
- **Framer Motion:** https://www.framer.com/motion
- **i18next:** https://www.i18next.com
- **Lucide Icons:** https://lucide.dev
- **OpenRouter API:** https://openrouter.ai

---

## Quick Tips

1. **Always wrap new pages in Suspense and PrivateRoute**
2. **Use `className` template literals for conditional styles**
3. **Import hooks at the top of component**
4. **Keep components under 300 lines for readability**
5. **Use meaningful variable names**
6. **Comment complex logic**
7. **Test in both light and dark modes**
8. **Test on mobile devices**
9. **Use browser DevTools for debugging**
10. **Keep localStorage keys consistent**

---

**Last Updated:** February 2026  
**Version:** 1.0
