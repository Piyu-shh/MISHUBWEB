import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProfile, setUserProfile } from '../utils/getAndPost';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const profile = await getUserProfile(currentUser.email);
          if (profile) {
            setUserData(profile);
          } else {
            const newUserProfile = {
              user_name: currentUser.displayName,
              email: currentUser.email,
              profile_pic: currentUser.photoURL,
              user_id: currentUser.uid,
              created_at: currentUser.metadata.creationTime,
              updated_at: currentUser.metadata.lastSignInTime,
              is_admin: false,
              registration_number: ''
            };
            const uuid = await setUserProfile(newUserProfile);
            if (uuid) {
              newUserProfile.user_id = uuid; // Set the uuid as user_id or any other property you want
              setUserData(newUserProfile);
            }
          }
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
