/**
 * COREFLUX PROFESSIONAL DESIGN SYSTEM
 * =================================
 * 
 * This document outlines the complete design system applied throughout CoreFlux.
 * Follow these guidelines for consistency across all pages.
 */

// =====================================
// 1. COLOR PALETTE
// =====================================

const COLORS = {
  // Primary Colors
  primary: {
    blue: '#3b82f6',      // Primary action color
    darkBlue: '#1e40af',  // Hover/Active state
  },
  
  // Neutral Colors
  light: {
    bg: '#ffffff',        // Light mode background
    surface: '#f3f4f6',   // Light mode secondary surface
    text: '#000000',      // Light mode text
    textSecondary: '#6b7280',  // Light mode secondary text
    border: '#e5e7eb',    // Light mode borders
  },
  
  dark: {
    bg: '#000000',        // Dark mode background (pure black)
    surface: '#111827',   // Dark mode secondary surface (gray-900)
    text: '#ffffff',      // Dark mode text
    textSecondary: '#9ca3af',  // Dark mode secondary text
    border: '#1f2937',    // Dark mode borders (gray-800)
  },
  
  // Status Colors
  status: {
    success: '#10b981',   // Green (success/online)
    warning: '#f59e0b',   // Amber (warning)
    error: '#ef4444',     // Red (error/danger)
    info: '#3b82f6',      // Blue (info)
  },
};

// =====================================
// 2. TYPOGRAPHY SYSTEM
// =====================================

const TYPOGRAPHY = {
  // Headings
  h1: 'text-4xl md:text-5xl font-black',           // Page titles (e.g., Settings)
  h2: 'text-3xl md:text-4xl font-black',           // Section headers
  h3: 'text-2xl font-bold',                        // Subsection headers
  h4: 'text-xl font-bold',                         // Component headers
  h5: 'text-lg font-semibold',                     // Card titles
  
  // Body Text
  body: 'text-sm',                         // Default body text
  bodySmall: 'text-xs',                    // Small body text
  bodyLarge: 'text-base',                  // Large body text
  
  // Special
  code: 'font-mono text-sm',               // Code blocks
  label: 'text-sm font-medium',            // Form labels
};

// =====================================
// 3. COMPONENT STYLING PATTERNS
// =====================================

// Button Pattern
const BUTTON_VARIANTS = {
  primary: isDark =>
    `px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all`,
  
  secondary: isDark =>
    `px-6 py-2 rounded-lg font-semibold border ${
      isDark
        ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
    } transition-all`,
  
  danger: isDark =>
    `px-6 py-2 rounded-lg font-semibold ${
      isDark
        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
        : 'bg-red-100 text-red-600 hover:bg-red-200'
    } transition-all`,
};

// Card Pattern
const CARD_VARIANTS = isDark =>
  `p-6 rounded-xl border ${
    isDark
      ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
      : 'bg-white border-gray-200 hover:border-gray-300'
  } transition-all`;

// Input Pattern
const INPUT_VARIANTS = isDark =>
  `w-full px-4 py-2 rounded-lg border ${
    isDark
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
      : 'bg-white border-gray-300 text-black placeholder-gray-400'
  } focus:outline-none focus:border-blue-500`;

// Badge Pattern
const BADGE_VARIANTS = (variant, isDark) => {
  const variants = {
    success: isDark
      ? 'bg-green-600/20 text-green-400 border border-green-700/50'
      : 'bg-green-100 text-green-700 border border-green-300',
    warning: isDark
      ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-700/50'
      : 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    error: isDark
      ? 'bg-red-600/20 text-red-400 border border-red-700/50'
      : 'bg-red-100 text-red-700 border border-red-300',
  };
  return `px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`;
};

// =====================================
// 4. SPACING SCALE
// =====================================

const SPACING = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px
};

// =====================================
// 5. BORDER RADIUS
// =====================================

const BORDER_RADIUS = {
  sm: 'rounded',      // 4px
  md: 'rounded-lg',   // 8px
  lg: 'rounded-xl',   // 12px
  full: 'rounded-full',  // 50%
};

// =====================================
// 6. SHADOWS
// =====================================

const SHADOWS = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  hover: 'shadow-lg hover:shadow-xl transition-shadow',
};

// =====================================
// 7. ANIMATION PATTERNS (Framer Motion)
// =====================================

const ANIMATIONS = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Slide animations
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  
  // Hover effects
  hoverScale: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },
};

// =====================================
// 8. LAYOUT PATTERNS
// =====================================

// Container pattern
const CONTAINER = 'max-w-6xl mx-auto px-6 md:px-12';

// Section spacing pattern
const SECTION = 'py-12 md:py-20';

// Grid patterns
const GRID = {
  '2col': 'grid grid-cols-1 md:grid-cols-2 gap-6',
  '3col': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  '4col': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
};

// =====================================
// 9. PAGE STRUCTURE PATTERN
// =====================================

/*
Standard page structure (used for all pages):

1. Header Section with:
   - Back navigation button
   - Page title (h1)
   - Optional subtitle
   - Optional icon

2. Content Container (max-w-6xl):
   - Use consistent padding
   - Apply motion animations on mount
   - Use grid for multi-column layouts

3. Footer/Actions:
   - Primary action button (blue)
   - Secondary actions (outlined)
   - Danger actions (red)

All pages should:
- Have dark mode support
- Use the professional color palette
- Include smooth animations
- Follow consistent spacing
- Use motion.div for animations
*/

// =====================================
// 10. RESPONSIVE BREAKPOINTS
// =====================================

const BREAKPOINTS = {
  sm: '640px',   // Small devices
  md: '768px',   // Medium devices
  lg: '1024px',  // Large devices
  xl: '1280px',  // Extra large devices
  '2xl': '1536px',  // 2X extra large
};

// =====================================
// 11. COMPONENT CHECKLIST
// =====================================

/*
✓ Navbar - Professional with smooth animations
✓ Landing Page - Hero + Features + Pricing + Footer
✓ Dashboard - Analytics with real-time charts
✓ AI Chat - OpenWebUI-inspired with model management
✓ Settings - Tab-based layout with heating + security
✓ Cards - Consistent borders and shadows
✓ Buttons - Primary, secondary, danger variants
✓ Forms - Inputs with focus states
✓ Modals - Centered with backdrop
✓ Loading states - Animated dots
*/

export {
  COLORS,
  TYPOGRAPHY,
  BUTTON_VARIANTS,
  CARD_VARIANTS,
  INPUT_VARIANTS,
  BADGE_VARIANTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATIONS,
  CONTAINER,
  SECTION,
  GRID,
  BREAKPOINTS,
};
