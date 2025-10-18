import { Loader as LoaderIcon } from 'lucide-react';

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};
