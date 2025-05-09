import React from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import CategorySelector from '../components/CategorySelector';
import { 
  trendingContent, 
  liveContent, 
  filmsContent,
  documentariesContent,
  tvShowsContent,
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
          <ContentRow title="Live Games" contents={liveContent} />
          <ContentRow title="Top Documentaries" contents={documentariesContent} />
          <ContentRow title="Sport Films" contents={filmsContent} />
          <ContentRow title="Original Shows" contents={tvShowsContent} />
          <ContentRow title="Trending Now" contents={trendingContent} />
          <ContentRow title="Continue Watching" contents={continueWatchingContent} />
          <ContentRow title="New Releases" contents={newReleasesContent} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
