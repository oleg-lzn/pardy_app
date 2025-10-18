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
    <div className="w-full h-full p-4 flex flex-col">
      <h2 className="text-center text-xl mb-4 flex-shrink-0">{`RSVPs`}</h2>
      <div className="flex-1 overflow-hidden">
        <div className="h-full rounded-md border border-default-100 overflow-y-auto">
          {data.length === 0 ? (
            <div className="p-8 text-center text-default-500">
              No RSVPs found
            </div>
          ) : (
            data.map(({ rsvps, events, attendees }) => (
              <div
                key={rsvps?.id || `${attendees.id}-${events?.id}`}
                className="border-b border-default-100 p-3 flex items-center gap-3 hover:bg-default-50 transition-colors"
              >
                <span className="flex-1 font-medium">{attendees.name}</span>
                <span>
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
                </span>
                <span>
                  <Link href={`/dashboard/events/${events?.id}`}>
                    <Chip
                      size="sm"
                      variant="faded"
                      className="cursor-pointer hover:bg-default-200"
                    >
                      {events?.name || 'Unknown Event'}
                    </Chip>
                  </Link>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RsvpsSlot;
