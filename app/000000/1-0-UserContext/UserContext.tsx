"use client"; // Mark this file as a client component

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import User type

// Define the user context type
type UserContextType = User | null;

// Define the user context
const UserContext = createContext<UserContextType>(null);

// Create a custom hook to use the user context
export const useUser = () => useContext(UserContext);

// Create the user provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContextType>(null); // State for user

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // Set user if authenticated
      } else {
        setUser(null); // Set user to null if not authenticated
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means it runs only once

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
