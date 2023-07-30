// context/PhotoContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Photo } from '../components/types';

type PhotoContextType = {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
};

const PhotoContext = createContext<PhotoContextType>({
  photos: [],
  setPhotos: () => {},
});

export const usePhotoContext = () => useContext(PhotoContext);

type PhotoProviderProps = {
  children: React.ReactNode; // Add the correct type for the children prop
};

export const PhotoProvider: React.FC<PhotoProviderProps> = ({ children }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  return (
    <PhotoContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};
