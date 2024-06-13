'use client'

import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { getUserProfile } from '../utils/getAndPost';

const ProfilePage = () => {
  const { user, loading,userData} = UserAuth();

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
              <p>User Name: {userData.displayName}</p>
              <p>Email: {userData.email}</p>
              <p>Registration Number: {userData.registration_number}</p>
              <p>Profile Picture: <img src={userData.photoURL} alt="Profile" /></p>
              <p>Created At: {userData.metadata.creationTime}</p>
              <p>Updated At: {userData.metadata.lastSignInTime}</p>
              
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
