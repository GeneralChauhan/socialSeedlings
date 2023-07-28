import FeedItem from './FeedItem';
import { Photo } from './types';
import styles from './styles.module.css';

interface ListViewProps {
  photos: Photo[];
}

const ListView: React.FC<ListViewProps> = ({ photos }) => {
  return (
    <div className={styles.listView}>
    {photos.map((photo) => (
      <FeedItem key={photo.id} photo={photo} />
    ))}
  </div>
  );
};

export default ListView;
