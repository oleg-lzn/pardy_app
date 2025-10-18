'use client';

const ErrorComponent = ({
  errorName,
  error,
  reset,
}: {
  errorName: string;
  error: Error;
  reset: () => void;
}) => {
  return (
    <div>
      <h2>Something bad happened with {errorName}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorComponent;
