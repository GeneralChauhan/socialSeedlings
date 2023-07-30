// utils/api.ts
import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID YOUR_UNSPLASH_ACCESS_KEY`,
  },
});

export const getUserProfile = async (username: string) => {
  try {
    const response = await unsplashApi.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};

export const getPhotosByUsername = async (username: string, page: number) => {
  try {
    const response = await unsplashApi.get(`/users/${username}/photos`, {
      params: {
        page,
        per_page: 10, // Adjust the number of photos per page as needed
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user photos");
  }
};
