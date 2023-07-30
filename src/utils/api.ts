// utils/api.ts
import axios from 'axios';
import { Photo } from '../components/types';

const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
const BASE_URL = 'https://api.unsplash.com';

const fetchPhotos = async (pageNumber: number): Promise<Photo[]> => {
    console.log(API_KEY);
  try {
    const response = await axios.get<any[]>(`${BASE_URL}/photos/random`, {
        params: {
            count: 10,
            client_id: API_KEY,
          },
    });

    // Extract the photo data from the API response
    const photosData: Photo[] = response.data.map((photo: any) => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
        small: photo.urls.small, // Add the 'small' property to the 'urls' object
      },
      user: {
        username: photo.user.username,
        name: photo.user.name,
        profileImage: photo.user.profile_image.medium,
      },
      description: photo.description,
      likes: photo.likes,
      location: photo.location?.title,
    }));

    return photosData;
  } catch (error : any) {
    throw new Error('Error fetching photos: ' + error.message);
  }
};

export default fetchPhotos;
