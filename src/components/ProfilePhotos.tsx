import FeedItem from './FeedItem';
import { Photo } from './types';
import styles from './styles.module.css';
import GridView from './GridView';

interface ProfilePhotosProps {
    photos: Photo[];
  }
  
  const ProfilePhotos: React.FC<ProfilePhotosProps> = ({ photos }) => {
    return (
      <div className={styles.profilePhotos}>
        {photos.map((photo) => (
          <GridView key={photo.id} photos={photo} />
        ))}
      </div>
    );
  };
  
  export default ProfilePhotos;