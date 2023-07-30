// components/GridItem.tsx
import React from 'react';
import styles from './styles.module.css';
import { Photo } from './types';

type GridItemProps = {
  photo: Photo;
  onClick: () => void; // Click handler to open the modal
};

const GridItem: React.FC<GridItemProps> = ({ photo, onClick }) => {
  return (
    <div className={styles.gridItem} onClick={onClick}>
      <img
        src={photo.urls.thumb}
        alt={photo.description || 'Photo'}
        className={styles.image}
      />
    </div>
  );
};

export default GridItem;
