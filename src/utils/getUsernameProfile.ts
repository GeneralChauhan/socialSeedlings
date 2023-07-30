import axios from 'axios';

// Replace 'your_access_key_here' with your actual Unsplash API access key
const unsplashAccessKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

const getUsernameProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/users/${username}`, {
      headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
      },
    });

    // The user profile image URL can be accessed using response.data.profile_image.large (or other sizes)
    const profileImageURL = response.data.profile_image.large;
    console.log('Profile Image URL:', profileImageURL);
    return profileImageURL;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export default getUsernameProfile;
