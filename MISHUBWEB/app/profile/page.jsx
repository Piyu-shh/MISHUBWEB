'use client'

import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { getUserProfile } from '../utils/getAndPost';

const ProfilePage = () => {
  const { user, loading } = UserAuth();
  const [userData, setUserData] = useState(null);
  const [uuid, setUuid] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const profileData = await getUserProfile('43e7e85b-915b-4c97-9077-802ef05af030');
          if (profileData) {
            setUserData(profileData);
            setUuid(profileData.user_id);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error here
        }
      }
    };

    fetchUserData();
  }, [user]); // Ensure useEffect runs whenever 'user' changes

  console.log(userData); // Check if user data is available

  return (
    <div className='p-4'>
      {loading ? (
        <Spinner />
      ) : user ? (
        <div>
          <p>Welcome, {user.displayName} - You are now logged in</p>
          {userData ? (
            <div>
              <p>User ID: {userData.user_id}</p>
              <p>User Name: {userData.user_name}</p>
              <p>Email: {userData.email}</p>
              <p>Registration Number: {userData.registration_number}</p>
              <p>Profile Picture: <img src={userData.profile_pic} alt="Profile" /></p>
              <p>Created At: {userData.created_at}</p>
              <p>Updated At: {userData.updated_at}</p>
              <p>UUID: {uuid}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      ) : (
        <p>Must be logged in to view</p>
      )}
    </div>
  );
};

export default ProfilePage;
