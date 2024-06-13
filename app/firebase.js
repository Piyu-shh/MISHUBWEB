// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD_mBs3RiWPnCjW8O9ym2eDt5CPufNyvI",
  authDomain: "mauth-c8e20.firebaseapp.com",
  projectId: "mauth-c8e20",
  storageBucket: "mauth-c8e20.appspot.com",
  messagingSenderId: "431179172046",
  appId: "1:431179172046:web:316cc0920285c0df02a89f",
  measurementId: "G-CR33VCPFWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);