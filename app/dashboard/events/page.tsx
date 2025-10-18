import { getAllEvents } from '@/utils/events';
import { getCurrentUser } from '@/utils/users';
import Link from 'next/link';

const Events = async () => {
  const user = await getCurrentUser();
  const events = await getAllEvents(user.id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-start">Events</h2>
      {events.length === 0 ? (
        <div className="text-center text-default-500">No events found</div>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between border border-default-200 rounded-lg px-4 py-3 m-0"
          >
            <div className="flex-1">
              <Link
                href={`/dashboard/events/${event.id}`}
                className="font-semibold text-lg hover:underline text-white"
              >
                {event.name}
              </Link>
              {event.description && (
                <div className="text-sm text-default-500 mt-1">
                  {event.description}
                </div>
              )}
            </div>
            <div className="flex flex-row-reverse gap-2 items-center min-w-fit ml-4">
              {event.status && (
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold border ${
                    event.status === 'live'
                      ? 'border-green-500 text-green-600'
                      : event.status === 'draft'
                      ? 'border-yellow-500 text-yellow-700'
                      : event.status === 'canceled'
                      ? 'border-red-500 text-red-600'
                      : event.status === 'ended'
                      ? 'border-gray-400 text-gray-500'
                      : 'border-blue-500 text-blue-600'
                  }`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              )}
              {event.startOn && (
                <span className="text-xs text-default-400 mt-1">
                  {new Date(event.startOn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Events;
