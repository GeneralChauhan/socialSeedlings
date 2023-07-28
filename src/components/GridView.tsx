import FeedItem from './FeedItem';
import { Photo } from './types';
import styles from './styles.module.css';


interface GridViewProps {
  photos: Photo[];
}

const GridView: React.FC<GridViewProps> = ({ photos }) => {
  return (
    <div className={styles.gridView}>
      {photos.map((photo) => (
        <FeedItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default GridView;
