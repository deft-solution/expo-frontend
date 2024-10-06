'use client';
// AuthContext.tsx
import { AUTH_WONDERPASS } from '@/constants/Storage';
import { UserLiveProfileMe } from '@/schema/Wonderpass/User';
import { getLiveCurrentProfile } from '@/service/user';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the context type
interface AuthLiveContextType {
  isAuthenticated: boolean;
  userProfile: UserLiveProfileMe | null;
  logout: () => void;
  onRefresh: () => void;
}

// Create the AuthContext
const AuthLiveContext = createContext<AuthLiveContextType | undefined>(undefined);

// Create the AuthProvider component
export const AuthLiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [userProfile, setUserProfile] = useState<UserLiveProfileMe | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for token in local storage on initial render
  useEffect(() => {
    const token = localStorage.getItem(AUTH_WONDERPASS);
    if (token) {
      fetchingUserProfile();
    }
  }, [isRefresh]);

  // Function to log out and remove token
  const logout = () => {
    localStorage.removeItem(AUTH_WONDERPASS);
    setIsAuthenticated(false);
    setUserProfile(null); // Clear user profile on logout
  };

  const onRefresh = () => {
    setIsRefresh(!isRefresh);
  };

  const fetchingUserProfile = () => {
    return getLiveCurrentProfile()
      .then((response) => {
        setUserProfile(response);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (error?.statusCode === 401) {
          console.error('Unauthorized access. Logging out.');
          logout(); // Log out the user if unauthorized
        }
      });
  };

  return (
    <AuthLiveContext.Provider value={{ isAuthenticated, userProfile, logout, onRefresh }}>
      {children}
    </AuthLiveContext.Provider>
  );
};

export const useAuthLive = (): AuthLiveContextType => {
  const context = useContext(AuthLiveContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
