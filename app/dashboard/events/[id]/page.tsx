import { getOneEvent } from '@/utils/events';
import { getCurrentUser } from '@/utils/users';
import { redirect } from 'next/navigation';
import { EventCard } from '@/components/EventCard';

const EventPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser();
  const event = await getOneEvent(user.id, params.id);

  if (!event) redirect('/dashboard/events');

  return <EventCard event={event} />;
};

export default EventPage;
