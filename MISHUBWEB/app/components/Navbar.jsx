import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, googleSignIn, logOut, loading} = UserAuth();
  

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  // Avoid rendering user-specific links until loading is false
  if (loading) {
    return null; // or a spinner/loader if desired
  }

  return (
    <div className='h-20 w-full border-b-2 flex items-center justify-between p-2'>
      <ul className='flex'>
        <li className='p-2 cursor-pointer'>
          <Link rel="stylesheet" href="/">Home</Link>
        </li>
        <li className='p-2 cursor-pointer'>
          <Link rel="stylesheet" href="/about">About</Link>
        </li>
        {user && (
          <li className='p-2 cursor-pointer'>
            <Link rel="stylesheet" href="/profile">Profile</Link>
          </li>
        )}
      </ul>

      {!user ? (
        <ul className="flex">
          <li onClick={handleSignIn} className='p-2 cursor-pointer'>Login</li>
        </ul>
      ) : (
        <div>
          <p>Welcome</p>
          <p onClick={handleSignOut} className='p-2 cursor-pointer'>Sign Out</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
