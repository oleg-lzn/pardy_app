import { getAttendeesCountForDashboard } from '@/utils/attendees';
import { getCurrentUser } from '@/utils/users';

const Home = async () => {
  const user = await getCurrentUser();
  const count = await getAttendeesCountForDashboard(user.id);
  return (
    <div className="w-full flex h-full justify-center items-center p-3 lg:p-4">
      <div className="text-center">
        <h4 className="text-base lg:text-lg font-bold">Attendees</h4>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold my-3 sm:my-4 lg:my-8 text-center">
          {count}
        </h2>
      </div>
    </div>
  );
};

export default Home;
