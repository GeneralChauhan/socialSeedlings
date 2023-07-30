// components/GridView.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';
import GridItem from './GridItem';
import Modal from './Modal';
// components/GridView.tsx


type GridViewProps = {
  photos: Photo[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
};

const GridView: React.FC<GridViewProps> = ({ photos, isLoading, onLoadMore, hasMore }) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const handleScroll = () => {
    if (isFetchingMore || !hasMore) return;
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - 100) {
      setIsFetchingMore(true);
    }
  };

  useEffect(() => {
    if (isFetchingMore) {
      onLoadMore();
      setIsFetchingMore(false);
    }
  }, [isFetchingMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.gridView}>
      {/* Render the grid of photos */}
      <div className={styles.photoGrid}>
        {photos?.map((photo) => (
          <div key={photo.id} className={styles.photoCard}>
            <img src={photo.urls.small} alt={photo.description} className={styles.photoImage} />
            <div className={styles.photoDetails}>
              <h3 className={styles.photoTitle}>{photo.alt_description}</h3>
              <p className={styles.photoLikes}>
                <i className="fas fa-heart"></i> {photo.likes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show loading message if isLoading is true */}
      {isLoading && <p>Loading...</p>}

      {/* Show "Load More" button if there are more photos to load */}
      {hasMore && (
        <button className={styles.loadMoreButton} onClick={onLoadMore} disabled={isLoading || isFetchingMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default GridView;
