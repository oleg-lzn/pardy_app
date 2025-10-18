'use client';

import ErrorComponent from '@/components/error';

const GuestsError = ({ error, reset }: { error: Error; reset: () => void }) => {
  return <ErrorComponent errorName="guests" error={error} reset={reset} />;
};
export default GuestsError;
