import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Photo } from '../../components/types';
import Header from '../../components/Headers';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import ProfilePhotos from '../../components/ProfilePhotos';

const UserProfile: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (username) {
      // Fetch user details and photos based on the username from the API
      axios
        .get<Photo[]>(`https://api.unsplash.com/users/${username}/photos`, {
          params: {
            client_id: 'bWUHyYl0DgIN_x1NXB-LWAAkzybxQHFcPilulRVJ75A',
          },
        })
        .then((response) => setPhotos(response.data))
        .catch((error) => console.error('Error fetching user photos:', error));
    }
  }, [username]);

  const handleViewTypeChange = (type: 'grid' | 'list') => {
    setViewType(type);
  };

  return (
    <>
      <Header />
      <div>
        <h1>{username}'s Profile</h1>
        <button onClick={() => handleViewTypeChange('grid')}>Grid View</button>
        <button onClick={() => handleViewTypeChange('list')}>List View</button>
      </div>
      {viewType === 'grid' ? <GridView photos={photos} /> : <ListView photos={photos} />}
    </>
  );
};

export default UserProfile;
