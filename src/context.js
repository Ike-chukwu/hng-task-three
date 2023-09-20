import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showSignIn, setShowSgnIn] = useState(false);
  const [user, sesUser] = useState({});

  ///function thatlogs a user out
  const logOut = () => {
    return signOut(auth);
  };

  //function that signs the user in
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      sesUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ showSignIn, setShowSgnIn, user, logOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
