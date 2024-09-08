import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize as null
  // console.log(user);

  const [loading, setLoading] = useState(true);
  // ! Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const profile = (name, photoURL) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);

      if (currentUser) {
        const displayName = currentUser.displayName;
        const email = currentUser.email;
        const photoURL = currentUser.photoURL;

        setUser({
          email,
          displayName,
          photoURL,
        });
        axios
          .post(
            "http://localhost:5000/jwt",
            { email, displayName, photoURL },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("token", res.data);
          });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  const userInfo = {
    user,
    createUser,
    loading,
    signIn,
    logout,
    profile,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
