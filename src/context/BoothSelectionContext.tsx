'use client';
import React, { createContext, useContext, useState } from 'react';

import { IBootList } from '@/schema/Booth';

export interface BoothSelectionContextType {
  ids: string[];
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  booths: IBootList[];
  setBooths: React.Dispatch<React.SetStateAction<IBootList[]>>;
}

const BoothContext = createContext<BoothSelectionContextType | undefined>(undefined);

// Hook to access the booth selection context
export const useBoothSelection = () => {
  const context = useContext(BoothContext);
  if (!context) {
    throw new Error('useBoothSelection must be used within a BoothProvider');
  }
  return context;
};

// BoothProvider component
export const BoothProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ids, setIds] = useState<string[]>([]); // Manage booth IDs state
  const [booths, setBooths] = useState<IBootList[]>([]); // Manage booth IDs state

  return (
    <BoothContext.Provider value={{ ids, setIds, booths, setBooths }}>
      {children}
    </BoothContext.Provider>
  );
};
