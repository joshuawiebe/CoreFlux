# 🎯 Developer Onboarding Guide

Welcome to CoreFlux! This guide helps new developers get up to speed quickly.

## ⏱️ Time Estimate
- **5 min** - Setup
- **10 min** - First run
- **15 min** - File exploration
- **30 min** - Feature review
- **Ready to code!**

## 🚀 Step 1: Setup (5 minutes)

### Prerequisites Check
```bash
# Verify Node.js installed (need 16+)
node --version        # Should show v16.0.0 or higher

# Verify npm installed
npm --version         # Should show 8.0.0 or higher
```

### Install Dependencies
```bash
# Navigate to project
cd /home/joshuawiebe/workspace/CoreFlux

# Install (if first time only)
npm install

# Verify installation
npm list react        # Should show installed version
```

## 🔥 Step 2: First Run (10 minutes)

### Start Development Server
```bash
# Start Vite dev server with hot reload
npm run dev

# You should see:
# ➜  Local: http://localhost:3000/
```

### Test in Browser
1. Open http://localhost:3000 in your browser
2. You should see the CoreFlux landing page
3. Try:
   - ✅ Click on "Sign Up"
   - ✅ Toggle dark mode (top right)
   - ✅ Change language (top right)
   - ✅ Create an account

### Console Check
```javascript
// Open browser DevTools (F12) and in console check:

// 1. Theme
localStorage.getItem('theme-preference')    // Should show 'light' or 'dark'

// 2. Language  
localStorage.getItem('language')            // Should show 'en', 'de', 'fr', or 'es'

// 3. User (after signup)
JSON.parse(localStorage.getItem('user'))   // Should show user object
```

## 📚 Step 3: File Exploration (15 minutes)

### Read These First
1. **[README.md](./README.md)** (5 min)
   - Project overview
   - Feature summary
   - Quick links to documentation

2. **[GETTING_STARTED.md](./GETTING_STARTED.md)** (5 min)
   - Feature breakdown
   - Usage examples
   - Testing checklist

3. **[FILE_INDEX.md](./FILE_INDEX.md)** (5 min)
   - Complete file map
   - Quick navigation
   - Find what you need

### Key Files to Understand
```
✅ src/App.jsx                      # Root component & routing
✅ src/context/ThemeContext.jsx     # Dark mode logic
✅ src/context/AuthContext.jsx      # User authentication
✅ src/components/SignupFormPro.jsx # 4-step signup form
✅ src/components/NavbarV2.jsx      # Navigation bar
✅ src/utils/heatingAIIntegration.js # AI heating system
```

## 🏗️ Step 4: Architecture Overview (10 minutes)

### Component Hierarchy
```
App (Root)
├── ThemeProvider (Dark/Light mode)
├── AuthProvider (User authentication)
├── ModelsProvider (AI models)
└── Router
    ├── Public Routes
    │   ├── Landing.jsx
    │   ├── Login.jsx
    │   └── Signup.jsx
    └── Protected Routes (require login)
        ├── Dashboard.jsx
        ├── Settings.jsx
        └── AIChat.jsx
```

### State Management
```
Contexts (all in src/context/):
├── ThemeContext     → isDark, toggleTheme
├── AuthContext      → isLoggedIn, user, signup, logout
├── ModelsContext    → selectedModel, models
├── SettingsContext  → userSettings
└── ToastContext     → notifications
```

### Key Technologies
1. **React 18** - UI framework
2. **Vite** - Build tool
3. **Tailwind CSS** - Styling
4. **Framer Motion** - Animations
5. **React Router** - Navigation
6. **i18next** - Translations
7. **OpenRouter** - AI API

## 💡 Step 5: Common Tasks (20 minutes)

### Task 1: Add a New Page

**File:** `src/pages/MyNewPage.jsx`
```jsx
import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import NavbarV2 from '../components/NavbarV2';

export default function MyNewPage() {
  return (
    <PrivateRoute>
      <NavbarV2 />
      <main className="pt-20 px-4">
        <h1>Welcome!</h1>
      </main>
    </PrivateRoute>
  );
}
```

**Update:** `src/App.jsx`
```jsx
import MyNewPage from './pages/MyNewPage';

// Add route:
<Route path="/my-page" element={<MyNewPage />} />
```

### Task 2: Add Dark Mode Support

Use these classes in your components:
```jsx
className={`
  bg-white text-slate-900
  dark:bg-slate-800 dark:text-white
  transition-colors
`}
```

Or with useTheme:
```jsx
import { useTheme } from '../context/ThemeContext';

const { isDark } = useTheme();

className={isDark ? 'dark-style' : 'light-style'}
```

### Task 3: Add Translations

1. Update all JSON files in `src/i18n/locales/`:

**en.json:**
```json
{
  "myfeature": {
    "title": "My Feature",
    "description": "Description here"
  }
}
```

**de.json:**
```json
{
  "myfeature": {
    "title": "Mein Feature",
    "description": "Beschreibung hier"
  }
}
```

2. Use in component:
```jsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<h1>{t('myfeature.title')}</h1>
```

### Task 4: Make Something Animated

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Hello World!
</motion.div>
```

### Task 5: Add Form Validation

```jsx
const [errors, setErrors] = useState({});

const validate = (data) => {
  const newErrors = {};
  if (!data.email) newErrors.email = 'Email required';
  if (data.password.length < 8) newErrors.password = 'Min 8 chars';
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validate(formData);
  if (Object.keys(newErrors).length === 0) {
    // Submit form
  } else {
    setErrors(newErrors);
  }
};
```

## 🧪 Step 6: Testing Guide (15 minutes)

### Manual Testing

#### Test Dark Mode
```javascript
// Open console and run:
document.documentElement.classList.add('dark');
// Should switch to dark theme

document.documentElement.classList.remove('dark');
// Should switch back to light
```

#### Test Language
```javascript
// Open console and run:
localStorage.setItem('language', 'de');
location.reload();
// Page should show German text
```

#### Test Authentication
```javascript
// Sign up with:
// First Name: Test
// Last Name: User
// Email: test@example.com
// Password: TestPass123!
// Then reload page - user should still be logged in
```

### Responsive Testing

1. **Mobile (< 640px)**
   - Press F12, click device icon
   - Select "iPhone 12"
   - Should show mobile menu

2. **Tablet (640px - 1024px)**
   - Select "iPad" device
   - Should show tablet layout

3. **Desktop (> 1024px)**
   - Remove device emulation
   - Should show full desktop layout

## 📖 Step 7: Documentation Reference

### Quick Links
- **Setup Issues?** → [GETTING_STARTED.md](./GETTING_STARTED.md#troubleshooting)
- **Need Code Examples?** → [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- **Looking for a File?** → [FILE_INDEX.md](./FILE_INDEX.md)
- **Want API Reference?** → [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md)
- **Technical Deep Dive?** → [IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)
- **Project Status?** → [PROJECT_STATUS.md](./PROJECT_STATUS.md)
- **Design Standards?** → [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

## 🚨 Common Issues & Solutions

### Issue: Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Then start dev server again
npm run dev
```

### Issue: ModuleNotFoundError
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Changes not reflecting
```bash
# Vite has hot reload, but sometimes:
# 1. Save file again
# 2. Refresh browser manually (F5)
# 3. Stop dev server (Ctrl+C) and restart
```

### Issue: Styles not applying
```bash
# Check Tailwind config
cat tailwind.config.js | grep darkMode

# Should show: darkMode: 'class'

# If not, rebuild:
npm run dev  # Full rebuild
```

## 📋 Development Workflow

### 1. Pick a Task
- Check [PROJECT_STATUS.md](./PROJECT_STATUS.md) for pending items
- Or create your own feature

### 2. Create a Branch (Optional)
```bash
git checkout -b feature/my-feature
```

### 3. Start Coding
- Use [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for snippets
- Reference [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md) for APIs
- Keep dev server running (`npm run dev`)

### 4. Test Changes
- Check in browser at http://localhost:3000
- Test on mobile/tablet too
- Check browser console for errors

### 5. Build for Production
```bash
# When ready to deploy
npm run build

# Preview production build
npm run preview
```

### 6. Commit Changes (Optional)
```bash
git add .
git commit -m "Add my awesome feature"
git push origin feature/my-feature
```

## 🎓 Learning Resources

### React
- [Official React Docs](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [React Context API](https://react.dev/reference/react/useContext)

### Styling
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Tailwind Icons](https://lucide.dev)
- [Dark Mode in Tailwind](https://tailwindcss.com/docs/dark-mode)

### Animations
- [Framer Motion Guide](https://www.framer.com/motion/introduction)
- [Animation Examples](https://www.framer.com/motion/examples)

### i18n
- [i18next Docs](https://www.i18next.com)
- [React-i18next Setup](https://react.i18next.com)

### Build Tools
- [Vite Docs](https://vitejs.dev)
- [Vite Performance](https://vitejs.dev/guide/features.html)

## ✅ Success Checklist

After completing this onboarding, you should be able to:

- [ ] Start dev server (`npm run dev`)
- [ ] Create a new React component
- [ ] Add responsive styling with Tailwind
- [ ] Add dark mode support
- [ ] Add translations
- [ ] Use theme and auth contexts
- [ ] Create smooth animations
- [ ] Test on mobile/tablet
- [ ] Build for production (`npm run build`)
- [ ] Navigate project structure

## 🎯 Next Steps

1. **Create your first feature!**
   - Pick something from PROJECT_STATUS.md
   - Or create your own idea
   - Remember to test thoroughly

2. **Join the team**
   - Share your progress
   - Ask questions
   - Learn from others

3. **Keep learning**
   - Read more documentation
   - Study existing components
   - Practice best practices

## 📞 Need Help?

1. **Check documentation** first - answers are usually there
2. **Search your question** in code
3. **Check browser console** for error details
4. **Try the troubleshooting guide** above
5. **Ask the team** if still stuck

## 🎉 You're Ready!

Welcome to the CoreFlux team! You now have everything you need to:
- ✅ Understand the project
- ✅ Write clean code
- ✅ Add new features
- ✅ Debug issues
- ✅ Deploy updates

Happy coding! 🚀

---

**Questions?** Check one of these:
- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- [QUICK_API_REFERENCE.md](./QUICK_API_REFERENCE.md)
- [FILE_INDEX.md](./FILE_INDEX.md)
- Browser DevTools Console

**Status:** ✅ Ready to develop  
**Last Updated:** February 2026  
**Version:** 1.0
