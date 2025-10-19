export const EventCard = ({ event }) => (
  <div className="border border-default-200 rounded-lg p-6">
    <h3 className="text-2xl font-semibold mb-2">{event.name}</h3>
    {event.description && (
      <p className="text-default-600 mb-4">{event.description}</p>
    )}
    <div className="flex items-center gap-4 text-sm">
      {event.status && (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold border ${
            event.status === 'live'
              ? 'border-green-500 text-green-600'
              : event.status === 'draft'
              ? 'border-yellow-500 text-yellow-700'
              : event.status === 'canceled'
              ? 'border-red-500 text-red-600'
              : event.status === 'ended'
              ? 'border-gray-400 text-gray-500'
              : 'border-blue-500 text-blue-600'
          }`}
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      )}
      {event.startOn && (
        <span className="text-default-500">
          {new Date(event.startOn).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      )}
    </div>
  </div>
);
