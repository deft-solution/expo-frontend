'use client';

import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAccessToken } from '@/utils/LocalStorage';

export interface AuthContextType {
  isAuthenticated: boolean;
  onRefreshAuthContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken.accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isRefresh]);

  const onRefreshAuthContext = useCallback(() => {
    setIsRefresh(!isRefresh);
  }, []);

  const contextObject = {
    isAuthenticated,
    onRefreshAuthContext,
  };

  return (
    <>
      <Suspense>
        <AuthContext.Provider value={contextObject}>
          {children}
        </AuthContext.Provider>
      </Suspense>
    </>
  );
};

export default AuthProvider;
