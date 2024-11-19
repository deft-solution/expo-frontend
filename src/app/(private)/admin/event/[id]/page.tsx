'use client';
import BootSelection from '@/components/partials/BoothSelection';
import { Button, Modal } from '@Core';
import { formatDisplayDate } from '@/helper/format-date';
import { IEventList } from '@/schema/Event';
import { getEventById } from '@/service/event';
import { UploadSharp } from '@mui/icons-material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UploadBoothForm from '@/components/partials/UploadBoothForm';
import Image from 'next/image';

const EventDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [eventRes, setEventRes] = useState<IEventList | null>(null);
  const [openBoothForm, setOpenBoothForm] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getEventById(id)
        .then((res) => {
          setLoading(false);
          setEventRes(res);
        })
        .catch((err) => {
          if (err?.message) {
            alert(err.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {};
  }, [id]);

  const goToEditPage = () => {
    if (eventRes?.id) {
      router.push('/admin/event/create?id=' + eventRes.id);
    }
  };

  const openForm = () => {
    setOpenBoothForm(true);
  };

  const onClosedBoothForm = () => {
    setOpenBoothForm(false);
  };

  return (
    <div>
      <Modal visible={openBoothForm}>
        <UploadBoothForm onClosed={onClosedBoothForm} />
      </Modal>
      {eventRes && (
        <div>
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex gap-2 4">
              {eventRes.logoUrl && (
                <Image
                  className="w-20 h-20 rounded-full object-contain"
                  width={200}
                  height={200}
                  src={eventRes.logoUrl}
                  alt={eventRes.logoUrl}
                />
              )}
              <div>
                <h2 className="text-xl font-bold">{eventRes.name}</h2>
                <div className="text-slate-500 flex gap-4 text-xs mt-2">
                  <div>{formatDisplayDate(eventRes.startFrom, 'DD MMMM  YYYY')}</div>
                  <div>-</div>
                  <div>{formatDisplayDate(eventRes.endDate, 'DD MMMM YYYY')}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-max" onClick={goToEditPage}>
                Edit Event
              </Button>
              <Button className="h-max" onClick={openForm}>
                <UploadSharp />
                <span>Upload Booth</span>
              </Button>
            </div>
          </div>
          <BootSelection floorPlanUrl={eventRes.floorPlanUrl} />
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
