import HomePageComponent from '@/components/partials/Home/HomePage';
import { IEventList } from '@/schema/Event';
import { getSSREventByID } from '@/service/ssr/event';
import { Metadata } from 'next';
import * as React from 'react';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { searchParams } = props;
  const eventId = searchParams.event as string;

  let event: IEventList | null = null;
  if (eventId) {
    event = await getSSREventByID(eventId);
  }

  return {
    title: event?.name ?? 'Cambodia Trade Expo | ពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជា',
    description: 'Cambodia Trade Expo | ពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជា',
    openGraph: {
      title: event?.name ?? 'Cambodia Trade Expo | ពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជា',
      description: event?.description ?? 'Cambodia Trade Expo | ពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជា',
      images: event?.logoUrl ?? 'Cambodia Trade Expo | ពិព័រណ៍ពាណិជ្ជកម្មកម្ពុជា',
      type: 'website',
    },
  };
}

export default function Home(props: any) {
  return (
    <main>
      <HomePageComponent />
    </main>
  );
}
