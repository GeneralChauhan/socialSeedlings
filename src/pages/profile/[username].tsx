// pages/profile/[username].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../components/styles.module.css';
import GridView from '../../components/GridView'; // Import the updated GridView component
import ListView from '../../components/ListView'; // Import the updated ListView component
import { Photo, User } from '../../components/types';
import { getUserProfile } from '../../utils/api'; // Import only the getUserProfile function

type UserProfileProps = {
  user: User;
  photos: Photo[];
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const router = useRouter();
  const { username } = router.query;

  // State for the user's profile image
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileImageURL = await getUserProfile(username as string);
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
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);

  // Function to fetch more photos for infinite scroll
  const fetchMorePhotos = async () => {
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

  // State for the view (grid or list)
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Function to switch between grid and list view
  const handleTabChange = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchMorePhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore]);

  return (
    <div className={styles.userProfile}>
      {/* Profile section */}
      <div className={styles.profileSection}>
        <div className={styles.profileSectionImage}>
          {profileImage && (
            <img src={profileImage} alt={user.username} className={styles.profilePicture} />
          )}
        </div>
        <div className={styles.profileSectionText}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.bio}>{user.bio}</p>
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
      {view === 'grid' ? <GridView photos={allPhotos}  isLoading={isLoading} onLoadMore={fetchMorePhotos} hasMore={hasMore} /> : <ListView photos={allPhotos} isLoading={isLoading} onLoadMore={fetchMorePhotos} hasMore={hasMore} />}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const username = params.username;

  try {
    const userProfileResponse = await axios.get(`https://api.unsplash.com/users/${username}`, {
      params: {
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
      },
    });

    const userProfile = userProfileResponse.data;

    return {
      props: {
        user: userProfile,
      },
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return {
      notFound: true,
    };
  }
}

export default UserProfile;
