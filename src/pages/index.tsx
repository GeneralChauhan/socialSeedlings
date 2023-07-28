import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Headers';
import { Photo } from '../components/types';
import GridView from '../components/GridView';

const NewsFeed: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Fetch 10 random photos from the API
    axios
      .get<Photo[]>('https://api.unsplash.com/photos/random', {
        params: {
          count: 10,
          client_id: 'YOUR_UNSPLASH_ACCESS_KEY',
        },
      })
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, []);

  return (
    <>
      <Header />
      <GridView photos={photos} />
    </>
  );
};

export default NewsFeed;
