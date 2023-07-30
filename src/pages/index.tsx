// pages/index.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Photo } from '../components/types';
import Header from '../components/Headers';
import GridView from '../components/GridView';
import ListView from '../components/ListView';
import fetchPhotos from '../utils/api';

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid'); // Set the default view to 'grid'

  const loadPhotos = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const newPhotos = await fetchPhotos(pageNumber);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasMore(false);
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    loadPhotos(1);
  }, []);

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    const nextPageNumber = Math.ceil(photos.length / 10) + 1;
    loadPhotos(nextPageNumber);
  };

  const toggleView = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Growwgram</title>
          <meta name="description" content="Growwgram - Your daily dose of photos" />
        </Head>

        <Header />
        <button className={styles.viewButton} onClick={toggleView}>
          {view === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
        {view === 'grid' ? (
          <GridView photos={photos} isLoading={isLoading} onLoadMore={handleLoadMore} hasMore={hasMore} />
        ) : (
          <ListView photos={photos} isLoading={isLoading} onLoadMore={handleLoadMore} hasMore={hasMore} />
        )}
      </div>
    </>
  );
};

export default Home;
