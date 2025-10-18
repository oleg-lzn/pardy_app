import { getGuestList } from '@/utils/attendees';
import { getCurrentUser } from '@/utils/users';

const GuestsPage = async () => {
  const user = await getCurrentUser();
  const guests = await getGuestList(user.id);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-start">Guest List</h2>
      {guests.length === 0 ? (
        <div className="text-center text-default-500">No guests found</div>
      ) : (
        guests.map((guest) => (
          <div
            key={guest.id}
            className="flex items-center justify-between border border-default-200 rounded-lg px-4 py-3 m-0"
          >
            <div className="flex-1">
              <p className="font-semibold text-lg hover:underline text-white">
                {guest.name}
              </p>
              <p className="text-sm text-default-500 mt-1">{guest.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GuestsPage;
