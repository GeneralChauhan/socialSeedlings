// components/ListView.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import FeedItem from './FeedItem';
import styles from './styles.module.css';
import { Photo } from './types';

interface ListViewProps {
  photos: Photo[]; // Add the 'photos' prop
  onLoadMore: () => void;
  hasMore: boolean;
}

const ListView: React.FC<ListViewProps> = ({ photos, onLoadMore, hasMore }) => {
  const fetchPhotos = () => {
    axios
      .get<Photo[]>('https://api.unsplash.com/photos/random', {
        params: {
          count: 10,
          client_id: process.env.UNSPLASH_API_KEY,
        },
      })
      .then((response) => {
        onLoadMore();
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className={styles.listView}>
      {photos.map((photo) => (
        <FeedItem key={photo.id} photo={photo} />
      ))}
      {hasMore && <div onClick={fetchPhotos}>Load More</div>}
    </div>
  );
};

export default ListView;
