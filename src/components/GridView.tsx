import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';
import GridItem from './GridItem';
import Modal from './Modal';
import { fetchPhotosRandom } from '../utils/api';

type GridViewProps = {
  isLoading: boolean;
  hasMore: boolean;
  photos: Photo[];
  onLoadMore: () => void;
};

const GridView: React.FC<GridViewProps> = ({ isLoading, hasMore, photos, onLoadMore }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleItemClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const loadMorePhotos = async () => {
    if (isLoading || !hasMore) return;

    try {
      const newPhotos = await fetchPhotosRandom(10);
      onLoadMore();
    } catch (error) {
      console.error('Error fetching more photos:', error);
    }
  };

  // Attach the scroll event listener for infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    console.log(photos);

    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if the user has scrolled to the bottom of the page
    if (scrollY + windowHeight >= documentHeight - 500) {
      loadMorePhotos();
    }
  };

  return (
    <div className={styles.gridView}>
      {photos.map((photo) => (
        <GridItem key={photo.id} photo={photo} onClick={() => handleItemClick(photo)} />
      ))}
      {selectedPhoto && <Modal photo={selectedPhoto} onClose={handleCloseModal} />}
    </div>
  );
};

export default GridView;
