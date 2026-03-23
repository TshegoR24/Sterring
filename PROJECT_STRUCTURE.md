# Sterring - Project Structure

## 📁 Folder Structure

```
sterring/
├── public/                    # Static assets
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── components/            # Reusable React components
│   │   ├── ui/               # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   └── ...
│   │   ├── ContentCard.tsx   # Movie card with hover effects
│   │   ├── ContentRow.tsx    # Horizontal scrolling row
│   │   ├── Footer.tsx        # Site footer
│   │   ├── HeroCarousel.tsx  # Featured movies carousel
│   │   ├── Navbar.tsx        # Top navigation bar
│   │   ├── SearchBar.tsx    # Search functionality
│   │   └── ThemeToggle.tsx  # Dark/light theme switcher
│   │
│   ├── pages/                # Page components
│   │   ├── Index.tsx         # Homepage
│   │   ├── MovieDetail.tsx   # Individual movie page
│   │   ├── Login.tsx         # User login page
│   │   ├── Signup.tsx        # User registration page
│   │   └── NotFound.tsx     # 404 error page
│   │
│   ├── data/                 # Data files
│   │   └── content.ts        # Movie data and categories
│   │
│   ├── types/                # TypeScript type definitions
│   │   └── content.ts        # Content interfaces
│   │
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Helper functions
│   │
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # App entry point
│   └── index.css             # Global styles
│
├── index.html                # HTML template
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.cjs        # PostCSS configuration
├── vite.config.ts            # Vite build configuration
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary Background**: Black (#000000)
- **Text**: White with opacity variations
- **Accents**: White/transparent overlays
- **Hover States**: White/10 to White/30 opacity

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Headings**: Bold, large sizes (4xl to 7xl)
- **Body**: Regular weight, responsive sizes

### Spacing
- Uses Tailwind's spacing scale
- Responsive padding: `px-4 sm:px-6 lg:px-8`
- Component gaps: `space-x-2` to `space-x-8`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Grid Layouts
- **Mobile**: 2 columns
- **Tablet**: 3-4 columns
- **Desktop**: 4-6 columns
- **Large Desktop**: 6 columns

## 🚀 Key Features

### 1. Hero Carousel
- Auto-rotating featured movies
- Manual navigation arrows
- Slide indicators
- Smooth transitions

### 2. Search Functionality
- Full-screen search overlay
- Real-time filtering
- Results with thumbnails
- Keyboard navigation support

### 3. Movie Cards
- Lazy-loaded images
- Hover effects with play button
- Rating display
- Responsive sizing

### 4. Movie Detail Page
- Large hero image
- Synopsis section
- Video player placeholder
- Similar movies recommendations

### 5. Authentication Pages
- Login form
- Signup form
- Form validation
- Responsive design

## 🔧 Development Guidelines

### Adding New Movies
Edit `src/data/content.ts`:
```typescript
const newMovie: Content = {
  id: "unique-id",
  title: "Movie Title",
  description: "Movie description...",
  type: "movie",
  genres: ["Drama", "Action"],
  year: 2024,
  rating: "PG-13",
  duration: "120 min",
  imageUrl: "https://image-url.com",
};
```

### Creating New Categories
Add to `categories` array in `src/data/content.ts`:
```typescript
{
  id: "new-category",
  name: "Category Name",
  content: [/* movies */],
}
```

### Styling Guidelines
- Use Tailwind utility classes
- Follow existing component patterns
- Maintain dark theme consistency
- Ensure responsive design

## 📦 Dependencies

### Core
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.1

### UI
- Tailwind CSS 3.4.11
- shadcn/ui components
- Lucide React (icons)

### Routing
- React Router DOM 6.26.2

### State Management
- TanStack Query 5.56.2

## 🎯 Performance Optimizations

1. **Lazy Loading**: Images use `loading="lazy"` attribute
2. **Code Splitting**: Route-based code splitting via React Router
3. **Image Optimization**: Use CDN for movie posters
4. **Minimal Re-renders**: React.memo for expensive components

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Alt text for images

## 🔒 Security Considerations

- Input validation on forms
- XSS prevention (React's built-in escaping)
- Secure authentication (to be implemented)
- HTTPS for production

## 📈 SEO Best Practices

- Semantic HTML structure
- Meta tags in index.html
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Descriptive alt text

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Recommended Hosting
- Vercel
- Netlify
- AWS Amplify
- Cloudflare Pages


