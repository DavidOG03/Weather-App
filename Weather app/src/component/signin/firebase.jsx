// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , signOut as authSignOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA3_w1sQeHC1UN_YAPOT_YZQ-gnME1rXE",
  authDomain: "weather-app-davidog03.firebaseapp.com",
  projectId: "weather-app-davidog03",
  storageBucket: "weather-app-davidog03.appspot.com",
  messagingSenderId: "795191064726",
  appId: "1:795191064726:web:c037d58beaa8058a24aab7",
  measurementId: "G-8M5WJMW34P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signOut = () => {
  return authSignOut(auth);
}
const provider = new GoogleAuthProvider();
export { auth, provider , signOut};
