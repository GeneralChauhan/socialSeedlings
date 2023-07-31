// components/GridItem.tsx
import React from 'react';
import styles from './styles.module.css';
import { Photo } from './types';

type GridItemProps = {
  photo: Photo;
  onClick: () => void;
};

const GridItem: React.FC<GridItemProps> = ({ photo, onClick }) => {
  return (
    <div className={styles.gridItem} onClick={onClick}>
      <img
        src={photo.urls.thumb}
        alt={photo.description || undefined }
        className={styles.gridImage}
      />
     
    </div>
  );
};

export default GridItem;
