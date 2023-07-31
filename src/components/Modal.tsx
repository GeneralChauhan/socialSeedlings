// components/Modal.tsx
import React, { useRef } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';
import FeedItem from './FeedItem';

type ModalProps = {
  photo: Photo;
  onClose: () => void; // Click handler to close the modal
};

const Modal: React.FC<ModalProps> = ({ photo, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && event.target === modalRef.current) {
      onClose();
      console.log(photo.description);
    }
  };

  return (
    <div className={styles.modalOverlay} ref={modalRef} onClick={handleOutsideClick}>
      <div className={styles.modalContent}>
        {/* Use the FeedItem component to display the photo and its details */}
        <FeedItem photo={photo} />
        <div className={styles.photoDetailsModal}>
          
            <p className={styles.photoDescriptionModal}>{photo.description || "zxcvb"}</p>

          
        </div>
      </div>
    </div>
  );
};

export default Modal;
