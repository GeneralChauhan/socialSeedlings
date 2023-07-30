// pages/profile/[username].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../components/styles.module.css';
import GridView from '../../components/GridView';
import ListView from '../../components/ListView';
import { Photo, User } from '../../components/types';
import getUsernameProfile from '../../utils/getUsernameProfile'; // Import the getUsernameProfile function

type UserProfileProps = {
  user: User;
  photos: Photo[];
};

const UserProfile: React.FC<UserProfileProps> = ({ user, photos }) => {
  const router = useRouter();
  const { username } = router.query;

  // State for the user's profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileImageURL = await getUsernameProfile(username as string);
        setProfileImage(profileImageURL);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  // State for the list of photos and infinite scroll
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allPhotos, setAllPhotos] = useState(photos);

  // Function to fetch more photos for infinite scroll
  const fetchPhotos = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${username}/photos?page=${pageNumber}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      );
      const newPhotos = response.data;

      setIsLoading(false);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      setAllPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

      if (newPhotos.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setIsLoading(false);
    }
  };

  // ... (other code)

  // Function to switch between grid and list view
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleTabChange = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  return (
    <div className={styles.userProfile}>
      {/* Profile section */}
      <div className={styles.profileSection}>
        {profileImage && (
          <img src={profileImage} alt={user.username} className={styles.profilePicture} />
        )}
        <h2 className={styles.userName}>{user.name}</h2>
        <p className={styles.bio}>{user.bio}</p>
        <div className={styles.interests}>
          {user?.interests?.map((interest) => (
            <span key={interest} className={styles.interestTag}>
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Tab bar to switch between GridView and ListView */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabButton} ${view === 'grid' ? styles.active : ''}`}
          onClick={() => handleTabChange('grid')}
        >
          Grid View
        </button>
        <button
          className={`${styles.tabButton} ${view === 'list' ? styles.active : ''}`}
          onClick={() => handleTabChange('list')}
        >
          List View
        </button>
      </div>

      {/* Display GridView or ListView based on the selected tab */}
      {view === 'grid' ? <GridView photos={allPhotos} /> : <ListView photos={allPhotos} isLoading={isLoading} onLoadMore={fetchPhotos} hasMore={hasMore} />}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const username = params.username;

  // Fetch user profile data from the Unsplash API using axios
  const userResponse = await axios.get(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`);
  const user = userResponse.data;

  // Fetch initial photos data from the Unsplash API using axios
  const photosResponse = await axios.get(`https://api.unsplash.com/users/${username}/photos?page=1&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`);
  const photos = photosResponse.data;

  return {
    props: {
      user,
      photos,
    },
  };
}

export default UserProfile;
