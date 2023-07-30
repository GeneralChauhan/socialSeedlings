// pages/profile/[username].tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import Header from '../../components/Headers';
import styles from '../../components/styles.module.css';
import { Photo } from '../../components/types';

const Profile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    if (username) {
      // Fetch user photos based on the username (use your own API endpoint)
      fetchPhotos(username as string);
    }
  }, [username]);

  const toggleView = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };

  const handleLoadMore = () => {
    // Implement the logic to load more photos and update the hasMore state accordingly
  };

  const fetchPhotos = (username: string) => {
    axios
    .get<Photo[]>(`https://api.unsplash.com/users/${username}/photos`, {
      params: {
        client_id: process.env.UNSPLASH_API_KEY,
        per_page: 10, // Set the number of photos to fetch per page
      },
    })
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  };
  
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1>{username}'s Profile</h1>
        {view === 'grid' ? (
          <GridView photos={photos} hasMore={hasMore} loading={loading} />
          ) : (
            <ListView photos={photos} hasMore={hasMore} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Profile;
