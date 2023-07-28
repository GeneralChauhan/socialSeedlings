import FeedItem from './FeedItem';
import { Photo } from './types';
import styles from './styles.module.css';

interface ProfilePhotosProps {
    photos: Photo[];
  }
  
  const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ photos }) => {
    return (
      <div className={styles.profilePhotos}>
        {photos.map((photo) => (
          <FeedItem key={photo.id} photo={photo} />
        ))}
      </div>
    );
  };
  
  export default ProfilePhotos;