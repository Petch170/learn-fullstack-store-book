/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import PropTypes from "prop-types";

const Authcontext = createContext();
export const useAuth = () => {
  return useContext(Authcontext);
};
// authProvider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   register
  const registerUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign up with google
  const GoogleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  // logout user
  const logOut = () => {
    return signOut(auth);
  };

  //   manage user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          username: displayName,
          photo: photoURL,
        };
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut,
    loading,
  };

  return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
