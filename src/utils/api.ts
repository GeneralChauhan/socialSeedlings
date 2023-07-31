// utils/api.ts
import axios from 'axios';
import { Photo, User, UserStats } from '../components/types';

const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
const BASE_URL = 'https://api.unsplash.com';

const fetchPhotosRandom = async (count: number): Promise<Photo[]> => {
  try {
    const response = await axios.get<any[]>(`${BASE_URL}/photos/random`, {
      params: {
        count,
        client_id: API_KEY,
      },
    });

    // Extract the photo data from the API response
    const photosData: Photo[] = response.data.map((photo: any) => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
        small: photo.urls.small,
      },
      user: {
        username: photo.user.username,
        name: photo.user.name,
        profileImage: photo.user.profile_image.medium,
      },
      description: photo.description,
      likes: photo.likes,
    }));

    return photosData;
  } catch (error:any) {
    throw new Error('Error fetching random photos: ' + error.message);
  }
};

const fetchPhotos = async (username: string, pageNumber: number): Promise<Photo[]> => {
  try {
    const response = await axios.get<any[]>(`${BASE_URL}/users/${username}/photos?page=${pageNumber}&&client_id=${API_KEY}`);

    // Ensure 'location' property is handled properly
    const photosData: Photo[] = response.data.map((photo: any) => ({
      id: photo.id,
      urls: {
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
        small: photo.urls.small,
      },
      user: {
        username: photo.user.username,
        name: photo.user.name,
        profileImage: photo.user.profile_image.medium,
      },
      description: photo.description,
      likes: photo.likes,
    }));

    return photosData;
  } catch (error:any) {
    throw new Error('Error fetching photos: ' + error.message);
  }
};

const getUserProfile = async (username: string): Promise<string> => {
  try {
    const response = await axios.get<User>(`${BASE_URL}/users/${username}/`, {
      params: {
        client_id: API_KEY,
      },
    });

    console.log('ass',response.data);
    return response.data.profile_image.large;
  } catch (error:any) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};

const fetchUserStats = async (username: string): Promise<UserStats> => {
  try {
    const response = await axios.get<UserStats>(`${BASE_URL}/users/${username}/statistics`,{
      params: {
        client_id: API_KEY,
      },
    });

    console.log(response);

    return response.data;

  } catch (error:any) {
    throw new Error('Error fetching Stats: ' + error.message);
  }
};

export { fetchPhotos, getUserProfile, fetchPhotosRandom, fetchUserStats };
