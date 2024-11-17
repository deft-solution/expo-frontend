'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { IBootList } from '@/schema/Booth';

export interface BoothSelectionContextType {
  ids: string[];
  eventId: string | null;
  booths: IBootList[];
  selectedBooth: IBootList | null;
  setIds: React.Dispatch<React.SetStateAction<string[]>>;
  setEventId: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [eventId, setEventId] = useState<string | null>(null); // Manage booth IDs state
  const [booths, setBooths] = useState<IBootList[]>([]); // Manage booths state

  const [selectedBooth, setSelectedBooth] = useState<IBootList | null>(null);

  useEffect(() => {
    if (ids.length && booths.length) {
      const boothId = ids[0]; // default First Index;
      const booth = booths.find(({ externalId }) => externalId === boothId);
      setSelectedBooth(booth ?? null);
    }
  }, [booths, ids]);

  return (
    <BoothContext.Provider
      value={{ ids, eventId, setEventId, setIds, booths, setBooths, selectedBooth }}
    >
      {children}
    </BoothContext.Provider>
  );
};
