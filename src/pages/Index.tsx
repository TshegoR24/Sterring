
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import CategorySelector from '../components/CategorySelector';
import { 
  trendingContent, 
  liveContent, 
  popularContent, 
  continueWatchingContent, 
  newReleasesContent 
} from '../data/content';

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
