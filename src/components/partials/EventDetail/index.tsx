'use client';
import React, { useEffect, useState } from 'react';

import { IEventList } from '@/schema/Event';
import { getAllBothForEvent } from '@/service/booth';
import { Header, useApi } from '@Core';

import { useBoothSelection } from '../../../context/BoothSelectionContext';
import BoothDetailPanel from '../BoothDetailsPanel';
import BootSelection from '../BoothSelection';

interface EventTypeProps {
  event: IEventList;
}

const EventDetails = (props: EventTypeProps) => {
  const { event } = props;

  const { response } = useApi({
    service: getAllBothForEvent,
    params: event.id,
    effects: [],
  });

  const [openPanel, setOpenPanel] = useState(false);
  const { ids, setIds, setBooths, booths } = useBoothSelection();

  useEffect(() => {
    if (ids.length) {
      setOpenPanel(true);
    }
  }, [ids]);

  useEffect(() => {
    if (response) {
      setBooths(response);
    }
  }, [response]);

  return (
    <div>
      <BoothDetailPanel
        id={event.id}
        isOpen={openPanel}
        onClose={() => setOpenPanel(false)}
      />
      <Header />
      {booths.length > 0 && event.floorPlanUrl && (
        <BootSelection floorPlanUrl={event.floorPlanUrl} onChange={setIds} />
      )}
    </div>
  );
};

export default EventDetails;
