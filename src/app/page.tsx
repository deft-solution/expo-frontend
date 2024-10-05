import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import EventDetails from '@/components/partials/EventDetail';
import { getSSREventByID } from '@/service/ssr/event';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { searchParams } = props;
  const id = searchParams.id as string;
  if (!id) {
    notFound();
  }

  const event = await getSSREventByID(id);
  if (!event) {
    notFound();
  }

  return {
    title: event.name,
    description: event.description,
    openGraph: {
      title: event.name,
      description: event.description,
      images: event.logoUrl,
      type: 'website',
    },
  };
}

export default async function Home({ searchParams }: Props) {
  const id = searchParams.id as string;
  const event = await getSSREventByID(id);

  return (
    <div>
      <EventDetails event={event} />
    </div>
  );
}
