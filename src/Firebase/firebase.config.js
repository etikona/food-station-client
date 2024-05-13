// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQFMqVtJiZM5d2xIcetCUSLfbwhfFSdM",
  authDomain: "food-station-59c20.firebaseapp.com",
  projectId: "food-station-59c20",
  storageBucket: "food-station-59c20.appspot.com",
  messagingSenderId: "938920347439",
  appId: "1:938920347439:web:53e3501b9777c27f1643da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
