'use client';

import ErrorComponent from '@/components/error';

const EventsError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorComponent errorName="events" error={error} reset={reset} />;
};
export default EventsError;
