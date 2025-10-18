'use client';

import ErrorComponent from '@/components/error';

const DashboardError = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return <ErrorComponent errorName="dashboard" error={error} reset={reset} />;
};

export default DashboardError;
