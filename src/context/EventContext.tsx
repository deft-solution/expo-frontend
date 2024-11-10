'use client';
import { IEventList } from '@/schema/Event';
import { getEventForGuest } from '@/service/event';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface EventContextType {
  eventId: string | null;
  event: IEventList | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// Hook to access the booth selection context
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useBoothSelection must be used within a BoothProvider');
  }
  return context;
};

// BoothProvider component
const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const eventId = useSearchParams().get('event') ?? null; // default value is "1"

  const [event, setEvent] = useState<IEventList | null>(null);

  useEffect(() => {
    if (eventId) {
      getEventForGuest(eventId)
        .then((response) => {
          if (response) {
            setEvent(response);
          }
        })
        .catch((error) => {
          setEvent(null);
          console.error(error);
        });
    }
  }, [eventId]);

  return <EventContext.Provider value={{ eventId, event }}>{children}</EventContext.Provider>;
};

// Export the component dynamically with client-side rendering enabled
export default dynamic(() => Promise.resolve(EventProvider), { ssr: false });
