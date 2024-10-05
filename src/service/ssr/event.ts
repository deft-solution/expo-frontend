import { notFound } from 'next/navigation';

import { API_URL } from '@/helper/config';
import { IEventList } from '@/schema/Event';

export function getSSREventByID(id: string): Promise<IEventList> {
  const url = `${API_URL()}/api/events/v1/guest/${id}`;

  return fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .catch((error) => {
      if (error.statusCode === 5000) {
        notFound();
      }
    });
}