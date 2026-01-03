// Mock data for content rows
export const liveContent = [
  {
    id: 1,
    title: 'Premier League Live: Arsenal vs Chelsea',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2024&auto=format&fit=crop',
    live: true,
    views: '1.5M watching',
    category: 'Live Shows'
  },
  {
    id: 2,
    title: 'NBA Finals: Lakers vs Celtics',
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?q=80&w=2090&auto=format&fit=crop',
    live: true,
    views: '890K watching',
    category: 'Live Shows'
  },
  {
    id: 3,
    title: 'Tennis Grand Slam: Wimbledon Finals',
    image: 'https://images.unsplash.com/photo-1595435934753-5f8b0f8c1c5f?q=80&w=1778&auto=format&fit=crop',
    live: true,
    views: '340K watching',
    category: 'Live Shows'
  }
];

export const filmsContent = [
  {
    id: 1,
    title: 'The Beautiful Game',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2936&auto=format&fit=crop',
    duration: '2:15:00',
    views: '1.2M',
    category: 'Films'
  },
  {
    id: 2,
    title: 'Champions of Tomorrow',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2940&auto=format&fit=crop',
    duration: '1:45:00',
    views: '845K',
    category: 'Films'
  },
  {
    id: 3,
    title: 'The Last Shot',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2869&auto=format&fit=crop',
    duration: '1:55:00',
    views: '650K',
    category: 'Films'
  }
];

export const documentariesContent = [
  {
    id: 1,
    title: 'The Science of Speed',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
    duration: '58:12',
    views: '2.1M',
    category: 'Documentaries'
  },
  {
    id: 2,
    title: 'Inside the Mind of Champions',
    image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=2012&auto=format&fit=crop',
    duration: '45:22',
    views: '3.4M',
    category: 'Documentaries'
  },
  {
    id: 3,
    title: 'The Evolution of Sports',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop',
    duration: '38:45',
    views: '1.5M',
    category: 'Documentaries'
  }
];

export const tvShowsContent = [
  {
    id: 1,
    title: 'Sports Talk: Weekly Roundup',
    image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=1974&auto=format&fit=crop',
    duration: '42:10',
    views: '2.3M',
    category: 'TV Shows'
  },
  {
    id: 2,
    title: 'Behind the Scenes: Training Camp',
    image: 'https://images.unsplash.com/photo-1580746738995-c246add43b05?q=80&w=2024&auto=format&fit=crop',
    duration: '36:58',
    views: '1.8M',
    category: 'TV Shows'
  },
  {
    id: 3,
    title: 'Rising Stars: Next Generation',
    image: 'https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?q=80&w=2070&auto=format&fit=crop',
    duration: '49:25',
    views: '2.7M',
    category: 'TV Shows'
  }
];

// For the trending section, we'll mix content from all categories
export const trendingContent = [
  ...liveContent.slice(0, 2),
  ...filmsContent.slice(0, 2),
  ...documentariesContent.slice(0, 2),
  ...tvShowsContent.slice(0, 1)
];

// For continue watching, we'll also mix content
export const continueWatchingContent = [
  ...filmsContent.slice(0, 1),
  ...documentariesContent.slice(0, 1),
  ...tvShowsContent.slice(0, 1),
  ...liveContent.slice(0, 1)
];

// For new releases, we'll show the latest content from each category
export const newReleasesContent = [
  ...liveContent.slice(0, 1),
  ...filmsContent.slice(0, 1),
  ...documentariesContent.slice(0, 1),
  ...tvShowsContent.slice(0, 1)
];
