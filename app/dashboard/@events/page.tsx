import { getEventsForDashboard } from '@/utils/events';
import { getCurrentUser } from '@/utils/users';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

const statusColors: Record<
  string,
  'primary' | 'warning' | 'danger' | 'success' | 'default' | 'secondary'
> = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'default',
  canceled: 'danger',
};

const EventsRsvp = async () => {
  const user = await getCurrentUser();
  const events = await getEventsForDashboard(user.id);

  return (
    <div className="w-full h-full p-3 lg:p-4 flex flex-col">
      <h2 className="text-center text-lg lg:text-xl mb-3 lg:mb-4 flex-shrink-0 font-bold">{`Latest Events`}</h2>
      <div className="flex-1 overflow-hidden">
        <div className="h-full rounded-md border border-default-100 overflow-y-auto">
          {events.length === 0 ? (
            <div className="p-6 lg:p-8 text-center text-default-500 text-sm lg:text-base">
              No events found
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="border-b border-default-100 p-2 lg:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 hover:bg-default-50 transition-colors"
              >
                <Link
                  href={`/dashboard/events/${event.id}`}
                  className="flex-1 w-full sm:w-auto"
                >
                  <span className="font-medium hover:text-primary transition-colors text-sm lg:text-base truncate block">
                    {event.name}
                  </span>
                </Link>
                <Chip
                  size="sm"
                  color={statusColors[event.status] || 'default'}
                  className="cursor-pointer w-full sm:w-auto"
                >
                  {event.status}
                </Chip>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsRsvp;
