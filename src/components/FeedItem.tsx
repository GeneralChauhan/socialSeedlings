// components/FeedItem.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';

type FeedItemProps = {
  photo: Photo;
};

const FeedItem: React.FC<FeedItemProps> = ({ photo }) => {
  const [likes, setLikes] = useState(photo.likes);
  const [liked, setLiked] = useState(false);

  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLike = () => {
    const now = new Date().getTime();
    const DOUBLE_CLICK_DELAY = 300; // Milliseconds

    if (now - lastClickTime < DOUBLE_CLICK_DELAY) {
      // Double click detected
      // setLikes((prevLikes) => prevLikes + 1);
      setLiked(!liked);
      liked? setLikes((prevLikes) => prevLikes - 1): setLikes( (prevLikes) => prevLikes + 1);
    }

    
    setLastClickTime(now);
  };
  
 

  return (
    <div className={styles.feedItem} onClick={handleLike}>
      <img src={photo.urls.regular} alt={photo.description || 'Photo'} />
      <div className={styles.info}>
        <div className={styles.user}>
          <img src={photo.user.profileImage} alt={photo.user.username} />
          <span>{photo.user.username}</span>
        </div>
        <div className={styles.likes}>
          <span>{likes}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
