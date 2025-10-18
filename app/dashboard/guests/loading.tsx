import { Loader } from '@/components/Loader';

const GuestLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center w-full h-full">
      <Loader />
    </div>
  );
};
export default GuestLoader;
