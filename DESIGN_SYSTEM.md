# Sterring - Premium Design System

## 🎬 Cinematic Design Philosophy

Sterring embodies a premium, cinematic OTT experience that celebrates South African storytelling. The design combines:

- **Cinematic Depth**: Multi-layer gradients, film grain, and subtle shadows
- **Cultural Authenticity**: South African-specific categories and content organization
- **Premium Interactions**: Smooth animations, micro-interactions, and hover states
- **Visual Hierarchy**: Clear progression from hero → featured → categories

## 🎨 Visual Design Elements

### Film Grain Effect
A subtle film grain overlay adds cinematic texture:
```css
.film-grain {
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  animation: grain 8s steps(10) infinite;
}
```

### Multi-Layer Gradients
Hero sections use layered gradients for depth:
- Base: `from-black via-black/80 via-black/50 to-black/30`
- Side: `from-black/60 via-transparent to-black/40`
- Bottom: `from-transparent via-transparent to-black/90`

### Typography Hierarchy

**Hero Titles**
- Size: `text-5xl sm:text-6xl md:text-7xl lg:text-8xl`
- Weight: `font-black` (900)
- Tracking: `tracking-tight`
- Shadow: Multi-layer text shadows for depth

**Category Titles**
- Size: `text-3xl md:text-4xl lg:text-5xl`
- Weight: `font-black`
- Style: Bold, prominent, with subtle shadow

**Body Text**
- Size: `text-lg sm:text-xl md:text-2xl`
- Weight: `font-light` for descriptions
- Opacity: `text-white/95` for readability

## 🎭 Component Animations

### Hero Carousel
- **Background Fade**: 1.2s ease with scale transform
- **Content Stagger**: Sequential fade-in with 0.2s delays
- **Button Hover**: Scale 1.05 with smooth transition

### Movie Cards
- **Initial Load**: Fade in with 0.5s delay per card (staggered)
- **Hover Scale**: 1.08x with smooth easing
- **Image Zoom**: 1.15x on hover with 0.6s duration
- **Overlay Fade**: Opacity transition 0-100% on hover
- **Shine Effect**: Gradient sweep animation on hover

### Content Rows
- **Scroll Animation**: Smooth scroll with 0.8x viewport width
- **Arrow Buttons**: Scale 1.1 on hover, 0.9 on tap
- **Row Fade-in**: Opacity and y-translate on scroll into view

## 🎯 South African Categories

### Award-Winning South African Films
Showcases internationally recognized SA cinema including:
- Academy Award winners
- Film Festival selections
- Critically acclaimed works

### Township Stories
Authentic narratives from South African townships:
- Urban dramas
- Social commentary
- Real-life experiences

### True SA History
Historical films based on real events:
- Apartheid era stories
- Freedom struggle narratives
- Biographical films

### Local Comedy Classics
Beloved South African comedies:
- Cultural humor
- Local references
- Community stories

## 🎨 Color & Contrast

### Primary Palette
- **Background**: Pure black (#000000) with subtle gradients
- **Text**: White with opacity variations (95%, 80%, 60%, 40%)
- **Accents**: White overlays with backdrop blur

### Interactive States
- **Hover**: `bg-white/20` with `backdrop-blur-md`
- **Active**: Scale down to 0.95
- **Focus**: Ring with white/30 opacity

### Depth Layers
1. Background gradients (z-0)
2. Content (z-10)
3. Overlays (z-20)
4. Film grain (z-5)

## 📐 Spacing System

### Vertical Rhythm
- **Section Gap**: `mb-16` (4rem)
- **Card Gap**: `space-x-4 sm:space-x-5`
- **Content Padding**: `px-4 sm:px-6 lg:px-8`

### Component Spacing
- **Hero Padding**: `pb-24` (6rem)
- **Row Padding**: `px-4 sm:px-6 lg:px-8`
- **Card Margin**: `mt-3` for info below card

## 🎬 Micro-Interactions

### Button Interactions
```tsx
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>Action</Button>
</motion.div>
```

### Card Interactions
- Hover: Scale, shadow increase, overlay reveal
- Click: Navigate to detail page
- Focus: Keyboard navigation support

### Scroll Interactions
- Smooth scrolling with `behavior: "smooth"`
- Arrow buttons for manual navigation
- Touch/swipe support on mobile

## 🎨 Premium Details

### Shadows
- **Cards**: `shadow-2xl` for depth
- **Buttons**: `shadow-2xl` with hover increase
- **Text**: Multi-layer drop shadows

### Borders
- **Cards**: `ring-1 ring-white/10` with hover to `ring-white/30`
- **Buttons**: `border-2` with hover state changes
- **Badges**: `border border-white/30`

### Backdrop Blur
- **Navbar**: `backdrop-blur-xl`
- **Buttons**: `backdrop-blur-md`
- **Overlays**: `backdrop-blur-sm`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px - 2 columns, smaller text
- **Tablet**: 640px - 1024px - 3-4 columns
- **Desktop**: > 1024px - 4-6 columns, larger text
- **Large**: > 1280px - 6 columns, maximum spacing

## 🎯 Performance Considerations

1. **Lazy Loading**: All images use `loading="lazy"`
2. **Animation Optimization**: GPU-accelerated transforms
3. **Viewport Detection**: Animations trigger on scroll into view
4. **Stagger Delays**: Prevent layout thrashing

## ♿ Accessibility

- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Full support
- **Focus Indicators**: Visible on all focusable elements
- **Color Contrast**: WCAG AA compliant
- **Screen Reader**: Semantic HTML structure


