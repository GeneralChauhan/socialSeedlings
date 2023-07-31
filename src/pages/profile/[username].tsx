// pages/profile/[username].tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../components/styles.module.css";
import Header from "../../components/Headers";
import GridView from "../../components/GridView"; // Import the updated GridView component
import ListView from "../../components/ListView"; // Import the updated ListView component
import { Photo, User, UserStats } from "../../components/types";
import { getUserProfile, fetchPhotos, fetchUserStats } from "../../utils/api"; // Import only the getUserProfile function
import formatNumber from "../../utils/functions"; // Import only the getUserProfile function
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import GridViewIcon from "@mui/icons-material/GridView";

type UserProfileProps = {
  user: User;
  photos: Photo[];
  userStats: any;
};

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  photos,
  userStats,
}) => {
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
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  // State for the list of photos and infinite scroll
  const [isLoading, setIsLoading] = useState(false);
  const [userViews, setUserViews] = useState<UserStats>();
  const [pageNumber, setPageNumber] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  
  const instaURL=(instaID:any) => `https://www.instagram.com/${instaID}/`;
  const twitterURL=(twitterID:any) => `https://www.twitter.com/${twitterID}/`;

  const loadData = async () => {
    setIsLoading(true);
    try {
      const newPhotos1 = await fetchPhotos(username as string, 1);
      setAllPhotos(newPhotos1);
      setIsLoading(false);
      // const userStats1 = await fetchUserStats(username as string);
    } catch (error) {
      setIsLoading(false);
      setHasMore(false);
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Function to fetch more photos for infinite scroll

  const fetchMorePhotos = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/${username}/photos?page=${pageNumber}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      );
      const newPhotos = response.data;
      console.log("newPhotos", newPhotos);

      setIsLoading(false);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      setAllPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

      if (newPhotos.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setIsLoading(false);
    }
  };

  const [view, setView] = useState<"grid" | "list">("list");

  const handleTabChange = (newView: "grid" | "list") => {
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <>
      <Header />
      <div className={styles.userProfile}>
        <div className={styles.profileSection}>
          <div className={styles.profileSectionImage}>
            {profileImage && (
              <img
                src={profileImage}
                alt={user.username}
                className={styles.profilePicture}
              />
            )}
          </div>
          <div className={styles.profileSectionText}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.bio}>{user.bio}</p>
            <div className={styles.userStats}>
              <div className={styles.userStatsWrapper}>
                <h4 className={styles.userStatsText}>
                  {formatNumber(userStats?.downloads?.total)}
                </h4>
                <p className={styles.userStatsLabel}>Downloads</p>
              </div>
              <div className={styles.userStatsWrapper}>
                <h4 className={styles.userStatsText}>
                  {formatNumber(userStats?.views?.total)}
                </h4>
                <p className={styles.userStatsLabel}>Views</p>
              </div>
              <div className={styles.userStatsWrapper}>
                <h4 className={styles.userStatsText}>{user.total_photos}</h4>
                <p className={styles.userStatsLabel}>Photos</p>
              </div>
            </div>
            <div className={styles.userLinks}>
            {user.instagram_username&&
              <a className={styles.userLinksButton} href={instaURL(user?.instagram_username)}>Instagram</a>
            }
              {user.twitter_username&&
              <a className={styles.userLinksButton} href={twitterURL(user?.twitter_username)}>Twitter</a>
              
              }
             {user.portfolio_url&&
              <a className={styles.userLinksButton} href={user?.portfolio_url}>Portfolio</a>

             }
            </div>
          </div>
        </div>

        <div className={styles.tabBar}>
        <button
            className={`${styles.tabButton} ${
              view === "list" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("list")}
          >
            <SplitscreenIcon />
          </button>
          <button
            className={`${styles.tabButton} ${
              view === "grid" ? styles.active : ""
            }`}
            onClick={() => handleTabChange("grid")}
          >
            <GridViewIcon />
          </button>
          
        </div>

        {view === "grid" ? (
          <GridView
            photos={allPhotos}
            isLoading={isLoading}
            onLoadMore={fetchMorePhotos}
            hasMore={hasMore}
          />
        ) : (
          <ListView
            photos={allPhotos}
            isLoading={isLoading}
            onLoadMore={fetchMorePhotos}
            hasMore={hasMore}
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ params }:any) {
  const username = params.username;


  try {
    const userProfileResponse = await axios.get(
      `https://api.unsplash.com/users/${username}`,
      {
        params: {
          client_id: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
        },
      }
    );

    const userProfile = userProfileResponse.data;

    const userStatsResponse = await fetchUserStats(username as string);

    return {
      props: {
        user: userProfile,
        userStats: userStatsResponse,
      },
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      notFound: true,
    };
  }
}

export default UserProfile;
