'use client';
import Shell from '@/components/Shell';
import { usePathname } from 'next/navigation';

const Dashboard = ({
  children,
  rsvps,
  events,
}: {
  children: React.ReactNode;
  rsvps: React.ReactNode;
  events: React.ReactNode;
}) => {
  const path = usePathname();

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className="flex flex-col lg:flex-row w-full h-full overflow-auto">
          {/* RSVPs Section */}
          <div className="w-full lg:w-1/2 border-r-0 lg:border-r border-b lg:border-b-0 border-default-50 flex flex-col min-w-0 min-h-[300px] lg:min-h-0">
            {rsvps}
          </div>

          {/* Events and Home Section */}
          <div className="w-full lg:w-1/2 flex flex-col min-w-0">
            {/* Events Section */}
            <div className="border-b border-default-50 w-full h-[300px] lg:h-1/2 flex flex-col min-h-0 overflow-y-auto">
              {events}
            </div>

            {/* Home Section */}
            <div className="w-full h-[300px] lg:h-1/2 flex flex-col min-h-0 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col min-h-0 overflow-y-auto p-2 lg:p-0">
          {children}
        </div>
      )}
    </Shell>
  );
};

export default Dashboard;
