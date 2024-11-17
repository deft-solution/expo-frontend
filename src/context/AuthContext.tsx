'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation

import { getAccessToken } from '@/utils/LocalStorage';

// Define the context type
export interface AuthContextType {
  isAuthenticated: boolean;
  onRefreshAuthContext: () => void;
}

// Create the AuthContext with an initial undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = getAccessToken();
      setIsAuthenticated(!!accessToken?.accessToken);
      setIsLoading(false);
    };

    // Run authentication check
    checkAuth();
  }, [isRefresh, router]);

  const onRefreshAuthContext = useCallback(() => {
    setIsRefresh((prev) => !prev);
  }, []);

  // Display a loading indicator while checking authentication status
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a custom loading spinner if desired
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, onRefreshAuthContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
