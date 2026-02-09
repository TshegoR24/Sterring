# SA Cinema - Styling Guide

## 🎨 Design Principles

### Color Palette
```css
/* Primary Colors */
--background: 0 0% 0%        /* Pure Black */
--foreground: 0 0% 100%      /* Pure White */

/* Accent Colors */
--primary: 0 0% 100%        /* White for buttons */
--secondary: 0 0% 20%       /* Dark gray for secondary elements */

/* Text Colors */
--text-primary: white
--text-secondary: white/90
--text-muted: white/60
--text-disabled: white/40
```

### Typography Scale
```css
/* Headings */
h1: text-4xl sm:text-5xl md:text-6xl lg:text-7xl (Hero)
h2: text-2xl md:text-3xl (Section titles)
h3: text-xl md:text-2xl (Subsection titles)

/* Body */
body: text-base sm:text-lg (Descriptions)
small: text-xs sm:text-sm (Metadata)
```

### Spacing System
```css
/* Padding */
Container: px-4 sm:px-6 lg:px-8
Section: py-8 sm:py-12
Component: p-4 sm:p-6

/* Gaps */
Small: gap-2
Medium: gap-4
Large: gap-6 sm:gap-8
```

## 🎭 Component Styles

### Buttons
```tsx
// Primary Button
<Button className="bg-white text-black hover:bg-white/90 rounded-full font-semibold">
  Primary Action
</Button>

// Secondary Button
<Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 rounded-full backdrop-blur-sm">
  Secondary Action
</Button>

// Ghost Button
<Button variant="ghost" className="text-white hover:bg-white/10 rounded-full">
  Ghost Action
</Button>
```

### Cards
```tsx
// Movie Card
<div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-lg">
  {/* Card content */}
</div>

// Info Card
<div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
  {/* Card content */}
</div>
```

### Navigation
```tsx
// Navbar
<nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
  {/* Nav content */}
</nav>
```

## 📱 Responsive Patterns

### Mobile First Approach
```tsx
// Base styles for mobile, then enhance for larger screens
className="text-base sm:text-lg md:text-xl lg:text-2xl"
className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
className="px-4 sm:px-6 lg:px-8"
```

### Grid Layouts
```tsx
// Responsive Grid
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"

// Flex with wrapping
className="flex flex-wrap gap-4"
```

## ✨ Animation & Transitions

### Hover Effects
```css
/* Scale on hover */
hover:scale-105 transition-transform duration-300

/* Opacity fade */
opacity-0 group-hover:opacity-100 transition-opacity duration-300

/* Background change */
hover:bg-white/10 transition-colors
```

### Page Transitions
```css
/* Fade in */
animate-fade-in (defined in tailwind.config.js)

/* Slide up */
animate-slide-up (defined in tailwind.config.js)
```

## 🎬 Movie Card Hover States

### Standard Hover
1. Card scales to 105%
2. Image scales to 110%
3. Gradient overlay appears
4. Play button fades in and scales up
5. Rating badge appears
6. Description overlay appears

### Implementation
```tsx
<div className="group relative cursor-pointer transition-all duration-300 hover:scale-105">
  <div className="relative aspect-[2/3]">
    <img className="transition-transform duration-500 group-hover:scale-110" />
    <div className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
</div>
```

## 🌈 Theme Support

### Dark Theme (Default)
- Background: Black (#000000)
- Text: White with opacity variations
- Accents: White overlays

### Light Theme (Future)
- Background: White (#FFFFFF)
- Text: Black with opacity variations
- Accents: Black overlays

## 📐 Layout Patterns

### Hero Section
```tsx
<div className="relative h-[85vh] w-full overflow-hidden">
  <div className="absolute inset-0 bg-cover bg-center" />
  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
  <div className="relative h-full flex items-end">
    {/* Content */}
  </div>
</div>
```

### Content Section
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {/* Section content */}
</div>
```

### Horizontal Scrolling Row
```tsx
<div className="flex space-x-4 overflow-x-auto scrollbar-hide">
  {/* Scrollable content */}
</div>
```

## 🎯 Best Practices

1. **Always use responsive classes**: Start with mobile, enhance for larger screens
2. **Maintain consistency**: Use the same spacing, colors, and typography scale
3. **Optimize for performance**: Use `loading="lazy"` for images
4. **Accessibility first**: Include ARIA labels and semantic HTML
5. **Dark theme default**: All components should work in dark theme
6. **Smooth transitions**: Use duration-300 or duration-500 for animations
7. **Backdrop blur**: Use `backdrop-blur-sm` or `backdrop-blur-md` for glass effects

## 🔧 Utility Classes

### Common Patterns
```css
/* Glass effect */
bg-white/10 backdrop-blur-md border border-white/10

/* Text truncation */
line-clamp-1, line-clamp-2, line-clamp-3

/* Hide scrollbar */
scrollbar-hide

/* Smooth scrolling */
scroll-smooth

/* Drop shadow */
drop-shadow-lg, drop-shadow-2xl
```


