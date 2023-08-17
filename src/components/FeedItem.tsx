// components/FeedItem.tsx
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Photo } from "./types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

type FeedItemProps = {
  photo: Photo;
};

const FeedItem: React.FC<FeedItemProps> = ({ photo }) => {
  const [likes, setLikes] = useState(photo.likes);
  const [liked, setLiked] = useState(false);

  const [lastClickTime, setLastClickTime] = useState(0);

  const rerouteURL = `/profile/${photo.user.username}`;

  const handleLike = () => {
    const now = new Date().getTime();
    const DOUBLE_CLICK_DELAY = 300; // Milliseconds

    if (now - lastClickTime < DOUBLE_CLICK_DELAY) {
      setLiked(!liked);
      liked
        ? setLikes((prevLikes) => prevLikes - 1)
        : setLikes((prevLikes) => prevLikes + 1);
    }

    setLastClickTime(now);
  };

  return (
    <div className={styles.feedItem} onClick={handleLike}>
      <div className={styles.infoUser}>
        <div className={styles.user}>
          <img
            src={photo.user.profileImage}
            className={styles.feedImage}
            alt={photo.user.username}
          />
          <Link href={rerouteURL} className={styles.profileName}>
            <span>{photo.user.username}</span>
          </Link>
        </div>
        {photo.description ? (
          <div>
            <p className={styles.photoDescription}>
              {photo.description || "Photo"}
            </p>
          </div>
        ) : (
          <br />
        )}
      </div>
      <img
        src={photo.urls.regular}
        alt={photo.description || "Photo Description"}
      />
      <div className={styles.photoBtmBar}>
        <div className={styles.likes}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <span>{likes}</span>  
        </div>
        <div className={styles.likes}>
          <span>{likes}</span>
          
        </div>
      </div>
      <div className={styles.feedBreak}></div>
    </div>
  );
};

export default FeedItem;
