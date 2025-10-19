'use client';

import ErrorComponent from '@/components/error';

const EventError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorComponent errorName="event" error={error} reset={reset} />;
};
export default EventError;
