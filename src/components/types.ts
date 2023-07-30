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
  location: string | null;
};
