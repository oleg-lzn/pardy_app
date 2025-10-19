import { getRsvpsForDashboard } from '@/utils/rsvps';
import { getCurrentUser } from '@/utils/users';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

const statusColors: Record<
  string,
  'primary' | 'warning' | 'danger' | 'success' | 'default' | 'secondary'
> = {
  going: 'primary',
  maybe: 'warning',
  'not-going': 'danger',
};
const RsvpsSlot = async () => {
  const user = await getCurrentUser();
  const data = await getRsvpsForDashboard(user.id);

  return (
    <div className="w-full h-full p-3 lg:p-4 flex flex-col">
      <h2 className="text-center text-lg lg:text-xl mb-3 lg:mb-4 flex-shrink-0 font-bold">{`RSVPs`}</h2>
      <div className="flex-1 overflow-hidden">
        <div className="h-full rounded-md border border-default-100 overflow-y-auto">
          {data.length === 0 ? (
            <div className="p-6 lg:p-8 text-center text-default-500 text-sm lg:text-base">
              No RSVPs found
            </div>
          ) : (
            data.map(({ rsvps, events, attendees }) => (
              <div
                key={rsvps?.id || `${attendees.id}-${events?.id}`}
                className="border-b border-default-100 p-2 lg:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 hover:bg-default-50 transition-colors"
              >
                <span className="flex-1 font-medium text-sm lg:text-base truncate">
                  {attendees.name}
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Chip
                    size="sm"
                    color={
                      rsvps?.status
                        ? statusColors[rsvps.status] || 'default'
                        : 'default'
                    }
                  >
                    {rsvps?.status || 'pending'}
                  </Chip>
                  <Link
                    href={`/dashboard/events/${events?.id}`}
                    className="flex-1 sm:flex-none"
                  >
                    <Chip
                      size="sm"
                      variant="faded"
                      className="cursor-pointer hover:bg-default-200 w-full sm:w-auto"
                    >
                      <span className="truncate">
                        {events?.name || 'Unknown Event'}
                      </span>
                    </Chip>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RsvpsSlot;
