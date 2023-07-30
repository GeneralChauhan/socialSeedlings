// components/GridView.tsx
import React, { useState } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';
import GridItem from './GridItem';
import Modal from './Modal';

type GridViewProps = {
  photos: Photo[];
};

const GridView: React.FC<GridViewProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleItemClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
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
