// components/GridView.tsx
import React from 'react';
import { Photo } from './types';
import FeedItem from './FeedItem';
import styles from './styles.module.css';

type GridViewProps = {
  photos: Photo[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
};

const GridView: React.FC<GridViewProps> = ({ photos, isLoading, onLoadMore, hasMore }) => {
  const handleScroll = () => {
    if (isLoading || !hasMore) return;

    const scrollOffset = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    if (scrollOffset < 200) {
      onLoadMore();
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className={styles.gridView}>
      {photos.map((photo) => (
        <FeedItem key={photo.id} photo={photo} />
      ))}
      {isLoading && <div className={styles.loader}>Loading...</div>}
    </div>
  );
};

export default GridView;
