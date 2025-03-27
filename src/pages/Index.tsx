
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import CategorySelector from '../components/CategorySelector';

// Mock data for content rows
const trendingContent = [
  {
    id: 1,
    title: 'CAF Champions League Highlights',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2936&auto=format&fit=crop',
    duration: '28:45',
    views: '1.2M'
  },
  {
    id: 2,
    title: 'Kenya vs Ethiopia: Athletics Showdown',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2940&auto=format&fit=crop',
    duration: '1:15:32',
    views: '845K'
  },
  {
    id: 3,
    title: 'African Basketball Championship',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2869&auto=format&fit=crop',
    duration: '45:18',
    views: '650K'
  },
  {
    id: 4,
    title: 'South Africa Rugby Tour',
    image: 'https://images.unsplash.com/photo-1511426682307-cfac763b731c?q=80&w=2787&auto=format&fit=crop',
    duration: '52:10',
    views: '1.1M'
  },
  {
    id: 5,
    title: 'Nigeria Super Eagles: Road to Glory',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2182&auto=format&fit=crop',
    duration: '36:25',
    views: '920K'
  },
  {
    id: 6,
    title: 'Premier African MMA Championship',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2152&auto=format&fit=crop',
    duration: '42:18',
    views: '780K'
  },
  {
    id: 7,
    title: 'Top 10 African Football Moments',
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2149&auto=format&fit=crop',
    duration: '15:45',
    views: '2.3M'
  }
];

const liveContent = [
  {
    id: 1,
    title: 'National Football League: Egypt vs Morocco',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2024&auto=format&fit=crop',
    live: true,
    views: '1.5M watching'
  },
  {
    id: 2,
    title: 'Professional Basketball: Lagos Warriors vs Nairobi Kings',
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?q=80&w=2090&auto=format&fit=crop',
    live: true,
    views: '890K watching'
  },
  {
    id: 3,
    title: 'Tennis Open: Tunisia Championships',
    image: 'https://images.unsplash.com/photo-1595435934753-5f8b0f8c1c5f?q=80&w=1778&auto=format&fit=crop',
    live: true,
    views: '340K watching'
  },
  {
    id: 4,
    title: 'Cycling Tour of Rwanda',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=2070&auto=format&fit=crop',
    live: true,
    views: '275K watching'
  },
  {
    id: 5,
    title: 'African Esports Championship: FIFA 23',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    live: true,
    views: '1.2M watching'
  }
];

const popularContent = [
  {
    id: 1,
    title: 'Inside African Football: Documentary Series',
    image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=2012&auto=format&fit=crop',
    duration: '45:22',
    views: '3.4M'
  },
  {
    id: 2,
    title: 'Athletics Legends: The Story of African Champions',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
    duration: '58:12',
    views: '2.1M'
  },
  {
    id: 3,
    title: "Cricket Rising: South Africa's Journey",
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop',
    duration: '38:45',
    views: '1.5M'
  },
  {
    id: 4,
    title: 'Basketball Dreams: From Streets to Pro',
    image: 'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?q=80&w=1974&auto=format&fit=crop',
    duration: '42:10',
    views: '2.3M'
  },
  {
    id: 5,
    title: 'Ultimate Safari Rally Challenge',
    image: 'https://images.unsplash.com/photo-1580746738995-c246add43b05?q=80&w=2024&auto=format&fit=crop',
    duration: '36:58',
    views: '1.8M'
  },
  {
    id: 6,
    title: 'The Fastest Men on Earth: African Sprinters',
    image: 'https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?q=80&w=2070&auto=format&fit=crop',
    duration: '49:25',
    views: '2.7M'
  }
];

const continueWatchingContent = [
  {
    id: 1,
    title: 'African Cup of Nations Highlights',
    image: 'https://images.unsplash.com/photo-1550358315-5d8215c77c50?q=80&w=2041&auto=format&fit=crop',
    duration: '18:45',
    views: '4.2M'
  },
  {
    id: 2,
    title: 'Marathon Champions: Breaking Limits',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop',
    duration: '32:18',
    views: '1.7M'
  },
  {
    id: 3,
    title: 'Rugby Sevens: African Challenge Cup',
    image: 'https://images.unsplash.com/photo-1607899466322-93f49570b8e7?q=80&w=2071&auto=format&fit=crop',
    duration: '28:52',
    views: '920K'
  },
  {
    id: 4,
    title: "Women's Football Revolution in Africa",
    image: 'https://images.unsplash.com/photo-1571844088753-57e210e84e0d?q=80&w=1776&auto=format&fit=crop',
    duration: '41:37',
    views: '1.5M'
  }
];

const newReleasesContent = [
  {
    id: 1,
    title: 'Upcoming Stars: Next Gen African Athletes',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop',
    duration: '38:22',
    views: '750K'
  },
  {
    id: 2,
    title: 'Behind The Scenes: CAF Training Centers',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=2070&auto=format&fit=crop',
    duration: '27:15',
    views: '620K'
  },
  {
    id: 3,
    title: "Surfing Champions: Africa's Coastal Heroes",
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    duration: '35:48',
    views: '890K'
  },
  {
    id: 4,
    title: 'Golf Masters: Teeing Off in Africa',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop',
    duration: '42:10',
    views: '580K'
  },
  {
    id: 5,
    title: 'Mountain Biking Across the Sahara',
    image: 'https://images.unsplash.com/photo-1553521509-811055776967?q=80&w=2065&auto=format&fit=crop',
    duration: '48:33',
    views: '710K'
  }
];

const Index: React.FC = () => {
  return (
    <MainLayout>
      <div className="pt-16">
        {/* Hero Banner */}
        <HeroBanner />
        
        {/* Category Selector */}
        <CategorySelector />
        
        {/* Content Rows */}
        <div className="space-y-2 md:space-y-4">
          <ContentRow title="Live Now" contents={liveContent} />
          <ContentRow title="Trending" contents={trendingContent} />
          <ContentRow title="Continue Watching" contents={continueWatchingContent} />
          <ContentRow title="Popular on AfriSport" contents={popularContent} />
          <ContentRow title="New Releases" contents={newReleasesContent} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
