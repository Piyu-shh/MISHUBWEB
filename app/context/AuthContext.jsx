import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserProfile, setUserProfile } from '../utils/getAndPost';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [uuid,setuuid]=useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
   
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          const profile = await getUserProfile(uuid);
          console.log(profile);
          if (profile) {
            setUserData(profile);
            setuuid(profile.user_id);
          } else {
            const newUserProfile = {
              "displayName": currentUser.displayName,
              "email": currentUser.email,
              "photoURL": currentUser.photoURL,
              "uid": currentUser.uid,
              "metadata":{
                "creationTime": currentUser.metadata.creationTime,
                "lastSignInTime": currentUser.metadata.lastSignInTime},
            
            };
            const uuid = await setUserProfile(newUserProfile);
            if (uuid) {
              newUserProfile.user_id = uuid; // Set the uuid as user_id or any other property you want
              setUserData(newUserProfile);
              setuuid(newUserProfile.user_id);
            }
          }

        }
        setLoading(false);
      });
      return () => unsubscribe();
    
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, loading, userData, uuid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
