import { Loader } from '@/components/Loader';

const EventsLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center w-full h-full">
      <Loader />
    </div>
  );
};
export default EventsLoader;
