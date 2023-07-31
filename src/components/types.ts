// components/types.ts
export type Photo = {
  id: string;
  urls: {
    regular: string;
    thumb: string;
    small: string; 
  };
  user: {
    username: string;
    name: string;
    profileImage: string;
  };
  description: string;
  likes: number;
  
};


export interface User {
  id: string;
  username: string;
  name: string;
  profile_image: any;
  bio: string;
  total_likes: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string;
  total_photos: string;
  
}

export interface UserStats {
  downloads: string[];
  views: string[];
  likes: string[];
}
