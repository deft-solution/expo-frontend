'use client';
import React, { useEffect, useState } from 'react';

import { IEventList } from '@/schema/Event';
import { getAllBothForEvent } from '@/service/booth';
import { getEventForGuest } from '@/service/event';
import { useApi } from '@Core';

import { useBoothSelection } from '../../../context/BoothSelectionContext';
import BoothDetailPanel from '../BoothDetailsPanel';
import BootSelection from '../BoothSelection';

interface EventTypeProps {
  id: string;
}

const EventDetails = (props: EventTypeProps) => {
  const { id } = props;

  const [event, setEvent] = useState<IEventList | null>(null);
  const [openPanel, setOpenPanel] = useState(false);
  const { ids, setIds, setEventId, setBooths, booths } = useBoothSelection();

  const { response: responseEvent } = useApi({
    service: getEventForGuest,
    params: id,
    effects: [id],
  });
  const { response } = useApi({ service: getAllBothForEvent, params: id, effects: [id] });

  useEffect(() => {
    if (ids.length) {
      setOpenPanel(true);
    }

    return () => {
      setOpenPanel(false);
    };
  }, [ids]);

  useEffect(() => {
    if (response) {
      setBooths(response);
    }
  }, [response]);

  useEffect(() => {
    if (responseEvent) {
      setEventId(responseEvent.id);
      setEvent(responseEvent);
    }
  }, [responseEvent]);

  return (
    <div>
      {event && (
        <>
          <BoothDetailPanel id={event.id} isOpen={openPanel} onClose={() => setOpenPanel(false)} />
          {event.floorPlanUrl && (
            <BootSelection floorPlanUrl={event.floorPlanUrl} onChange={setIds} />
          )}
        </>
      )}
    </div>
  );
};

export default EventDetails;
