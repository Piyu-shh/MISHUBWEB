// getAndPost.js

import axios from 'axios';

const apiUrl = 'https://mis-hub-backend-git-main-amrit-sundarkas-projects.vercel.app/profile';

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/get_user_data`, {
      params: { user_id: userId }
    });

    // Assuming the API response contains the user data in a field called 'data'
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const setUserProfile = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/set_profile/`, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    if(response.statusCode === 200){
      console.log("Profile Set successfully");
      const uuid = response.data;
      return uuid;
    } else {
      console.error(`Failed to set profile: ${response.data}`);
      return null;
    }
  } catch (error) {
    console.error('Error setting user profile:', error);
    return null;
  }
};
