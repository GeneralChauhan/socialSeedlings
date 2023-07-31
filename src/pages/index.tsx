// pages/index.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Photo } from '../components/types';
import Header from '../components/Headers';
import ListView from '../components/ListView';
import { fetchPhotosRandom } from '../utils/api';

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid'); 

  const loadPhotos = async (pageNumber: number) => {
    setIsLoading(true);
    try {
      const newPhotos = await fetchPhotosRandom(pageNumber);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasMore(false);
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    loadPhotos(10);
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
       
        
          <ListView photos={photos} isLoading={isLoading} onLoadMore={handleLoadMore} hasMore={hasMore} />
        
      </div>
    </>
  );
};

export default Home;
