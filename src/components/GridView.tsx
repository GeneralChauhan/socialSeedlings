// components/GridView.tsx
import { useEffect, useRef } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';
import styles from './styles.module.css';
import { Photo } from './types';

interface GridViewProps {
  photos: Photo[]; // Add the 'photos' prop
  onLoadMore: () => void;
  hasMore: boolean;
}

const GridView: React.FC<GridViewProps> = ({ photos, onLoadMore, hasMore }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (hasMore && loaderRef.current) {
      const { top } = loaderRef.current.getBoundingClientRect();
      if (top <= window.innerHeight) {
        onLoadMore();
      }
    }
  };

  useEffect(() => {
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Clean up the scroll event listener when the component unmounts
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.gridView}>
      {photos.map((photo) => (
        <FeedItem key={photo.id} photo={photo} />
      ))}
      {hasMore && <div ref={loaderRef} />}
    </div>
  );
};

export default GridView;
