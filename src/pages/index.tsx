// pages/index.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import Header from '../components/Headers';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [hasMore, setHasMore] = useState(true);

  const toggleView = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };

  const handleLoadMore = () => {
    // Call the fetchPhotos function again to load more photos
    fetchPhotos();
  };

  const fetchPhotos = () => {
    // Implement the photo fetching logic here, similar to ListView and GridView
    // This function should set the photos state and update hasMore accordingly
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <Header toggleView={toggleView} view={view} />
      <div className={styles.container}>
        <Head>
          <title>My App</title>
        </Head>
        {view === 'grid' ? (
          <GridView onLoadMore={handleLoadMore} hasMore={hasMore} />
        ) : (
          <ListView onLoadMore={handleLoadMore} hasMore={hasMore} />
        )}
      </div>
    </div>
  );
};

export default Home;
