// components/types.ts
export type Photo = {
  id: string;
  urls: {
    regular: string;
    thumb: string;
    small: string; // Add the 'small' property to the 'urls' object
  };
  user: {
    username: string;
    name: string;
    profileImage: string;
  };
  description: string | null;
  likes: number;
};


export interface User {
  id: string;
  username: string;
  name: string;
  profile_image: any;
  bio: string;
  interests: string[];
  tags: string[];
}