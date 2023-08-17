import axios from 'axios';
import { Photo, User, UserStats } from '../components/types';

const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY ;
const BASE_URL = 'https://api.unsplash.com';

const cache: Map<string, any> = new Map();

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

const getCacheKey = (funcName: string, params: any[]): string => {
  return `${funcName}_${JSON.stringify(params)}`;
};

const isCacheValid = (cachedData: any): boolean => {
  return Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME;
};

const fetchDataWithCaching = async (
  funcName: string,
  params: any[],
  fetchFunction: (...params: any[]) => Promise<any>
): Promise<any> => {
  const cacheKey = getCacheKey(funcName, params);
  const cachedData = cache.get(cacheKey);

  if (cachedData && isCacheValid(cachedData)) {
    console.log(`Using cached data for ${funcName}.`);
    return cachedData.data;
  }

  try {
    const fetchedData = await fetchFunction(...params);

    cache.set(cacheKey, { data: fetchedData, timestamp: Date.now() });

    return fetchedData;
  } catch (error) {
    throw new Error(`Error fetching data for ${funcName}: ${error.message}`);
  }
};

const fetchPhotosRandom = async (count: number): Promise<Photo[]> => {
  try {
    const response = await axios.get<any[]>(`${BASE_URL}/photos/random`, {
      params: {
        count,
        client_id: API_KEY,
      },
    });

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
  } catch (error) {
    throw new Error('Error fetching random photos: ' + error.message);
  }
};

const fetchPhotos = async (username: string, pageNumber: number): Promise<Photo[]> => {
  try {
    const response = await axios.get<any[]>(`${BASE_URL}/users/${username}/photos?page=${pageNumber}&&client_id=${API_KEY}`);

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
  } catch (error) {
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

    return response.data.profile_image.large;
  } catch (error) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};

const fetchUserStats = async (username: string): Promise<UserStats> => {
  try {
    const response = await axios.get<UserStats>(`${BASE_URL}/users/${username}/statistics`, {
      params: {
        client_id: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error fetching Stats: ' + error.message);
  }
};

// Wrapping each function with caching
const cachedFetchPhotosRandom = (count: number): Promise<Photo[]> => {
  return fetchDataWithCaching('fetchPhotosRandom', [count], fetchPhotosRandom);
};

const cachedFetchPhotos = (username: string, pageNumber: number): Promise<Photo[]> => {
  return fetchDataWithCaching('fetchPhotos', [username, pageNumber], fetchPhotos);
};

const cachedGetUserProfile = (username: string): Promise<string> => {
  return fetchDataWithCaching('getUserProfile', [username], getUserProfile);
};

const cachedFetchUserStats = (username: string): Promise<UserStats> => {
  return fetchDataWithCaching('fetchUserStats', [username], fetchUserStats);
};

export { cachedFetchPhotosRandom as fetchPhotosRandom, cachedFetchPhotos as fetchPhotos, cachedGetUserProfile as getUserProfile, cachedFetchUserStats as fetchUserStats };
