'use client';
import ErrorComponent from '@/components/error';

const RsvpsError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorComponent errorName="rsvps" error={error} reset={reset} />;
};
export default RsvpsError;
