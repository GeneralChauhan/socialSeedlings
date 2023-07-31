// components/FeedItem.tsx
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Photo } from './types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
      <div className={styles.infoUser}>
        <div className={styles.user}>
          <img src={photo.user.profileImage} alt={photo.user.username} />
          <span>{photo.user.username}</span>
        </div>
        <div className={styles.likes}>
          <span>{likes}</span>
          {
            liked? <FavoriteIcon/>: <FavoriteBorderIcon/>
          }
        </div>

      </div>
      <div >
        <p className={styles.photoDescription}>{photo.description || 'Photo'}</p>
      </div>
      <div className={styles.feedBreak}></div>
    </div>
  );
};

export default FeedItem;
