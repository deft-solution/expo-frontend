'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { IBootList } from '@/schema/Booth';

export interface BoothSelectionContextType {
  selectedBoothIds: string[]; // IDs of the selected booths
  currentEventId: string | null; // ID of the currently active event
  boothList: IBootList[]; // List of all available booths
  selectedBooths: IBootList[]; // List of the booths that are currently selected
  setSelectedBoothIds: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentEventId: React.Dispatch<React.SetStateAction<string | null>>;
  setBoothList: React.Dispatch<React.SetStateAction<IBootList[]>>;
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
  const [selectedBoothIds, setSelectedBoothIds] = useState<string[]>([]); // Manage selected booth IDs
  const [currentEventId, setCurrentEventId] = useState<string | null>(null); // Manage current event ID
  const [boothList, setBoothList] = useState<IBootList[]>([]); // Manage list of all booths
  const [selectedBooths, setSelectedBooths] = useState<IBootList[]>([]); // Manage selected booths

  useEffect(() => {
    // Update the list of selected booths whenever selected IDs or booth list changes
    const updatedSelectedBooths = selectedBoothIds
      .map((id) => boothList.find((booth) => booth.id === id))
      .filter((booth): booth is IBootList => !!booth); // Filter out undefined values

    setSelectedBooths(updatedSelectedBooths);
  }, [boothList, selectedBoothIds]);

  return (
    <BoothContext.Provider
      value={{
        selectedBoothIds,
        currentEventId,
        setCurrentEventId,
        setSelectedBoothIds,
        boothList,
        setBoothList,
        selectedBooths,
      }}
    >
      {children}
    </BoothContext.Provider>
  );
};
