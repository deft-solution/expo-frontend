'use client';
import React, { useEffect, useState } from 'react';

import { IEventList } from '@/schema/Event';
import { getAllBoothForEvent } from '@/service/booth';
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
  const { boothList, setBoothList, setSelectedBoothIds, selectedBoothIds, setCurrentEventId } =
    useBoothSelection();

  const { response: responseEvent } = useApi({
    service: getEventForGuest,
    params: id,
    effects: [id],
  });
  const { response } = useApi({ service: getAllBoothForEvent, params: id, effects: [id] });

  useEffect(() => {
    if (response) {
      setBoothList(response);
    }
  }, [response]);

  useEffect(() => {
    if (responseEvent) {
      setCurrentEventId(responseEvent.id);
      setEvent(responseEvent);
    }
  }, [responseEvent]);

  const onSelectBooth = (ids: string[]) => {
    setOpenPanel(true);
    setSelectedBoothIds(ids);
  };

  return (
    <div>
      {event && (
        <>
          <BoothDetailPanel
            eventId={event.id}
            isOpen={openPanel}
            onClose={() => setOpenPanel(false)}
          />
          {boothList.length > 0 && event.floorPlanUrl && (
            <BootSelection
              maxBoothPerOrder={event.maxBoothPerOrder}
              floorPlanUrl={event.floorPlanUrl}
              onChange={onSelectBooth}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EventDetails;
