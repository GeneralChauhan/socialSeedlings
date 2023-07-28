import styles from './styles.module.css';




interface Photo {
    id: string;
    urls: {
      small: string;
      regular: string;
      // Add other resolutions if needed
    };
    description?: string;
    // Add other photo details here
  }
  
  interface FeedItemProps {
    photo: Photo;
  }
  
  const FeedItem: React.FC<FeedItemProps> = ({ photo }) => {
    return (
        <div className={styles.feedItem}>
        <img className={styles.photoImg} src={photo.urls.regular} alt={photo.description || 'Photo'} />
        {/* Add other photo details (likes, etc.) here */}
      </div>
    );
  };
  
  export default FeedItem;
  