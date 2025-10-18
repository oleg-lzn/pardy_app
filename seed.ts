import { db } from '@/db/db';
import { events, attendees, rsvps } from '@/db/schema';

const seedDatabase = async () => {
  try {
    const newUser = await db.query.users.findFirst();

    if (!newUser) {
      console.error('create an account first');
      return;
    }

    const newEvents = await db
      .insert(events)
      .values([
        {
          name: 'Tech Conference 2021',
          startOn: '2024-09-10',
          createdById: newUser.id,
          description: 'A conference about the latest in tech.',
          streetNumber: 123,
          street: 'Innovation Blvd',
          zip: 94043,
          bldg: '12A',
          isPrivate: false,
          status: 'live',
        },
        {
          name: 'Music Festival 2021',
          startOn: '2024-10-05',
          createdById: newUser.id,
          description: 'Enjoy music from top artists from around the world.',
          streetNumber: 456,
          street: 'Festival Road',
          zip: 94043,
          bldg: '9B',
          isPrivate: true,
          status: 'draft',
        },
        {
          name: 'Random Event 2026',
          startOn: '2026-10-05',
          createdById: newUser.id,
          description: 'Enjoy a random event.',
          streetNumber: 456,
          street: 'Festival Road',
          zip: 94043,
          bldg: '9B',
          isPrivate: true,
          status: 'draft',
        },
        {
          name: 'Tech Conference 2027',
          startOn: '2027-10-05',
          createdById: newUser.id,
          description: 'Enjoy a random tech conference event.',
          streetNumber: 456,
          street: 'Festival Road',
          zip: 94043,
          bldg: '9B',
          isPrivate: true,
          status: 'draft',
        },
        {
          name: 'Random Event 2028',
          startOn: '2021-10-05',
          createdById: newUser.id,
          description: 'Enjoy a random event.',
          streetNumber: 456,
          street: 'Random Road',
          zip: 94043,
          bldg: '9B',
          isPrivate: true,
          status: 'draft',
        },
      ])
      .returning();

    // Adding attendees
    const newAttendees = await db
      .insert(attendees)
      .values([
        {
          email: 'jesse.doe@example.com',
          name: 'Jesse Doe',
        },
        {
          email: 'alice.wonderland@example.com',
          name: 'Alice Wonderland',
        },
        {
          email: 'peter.cook@example.com',
          name: 'Peter Cook',
        },
        {
          email: 'jessie.woe@example.com',
          name: 'Mr Squid',
        },
        {
          email: 'squidgangy@example.com',
          name: 'Mrs Squid',
        },
        {
          email: 'squidgangx@example.com',
          name: 'Mr Squid Gang X',
        },
        {
          email: 'hulk.jackson@example.com',
          name: 'Hulk Jackson',
        },
      ])
      .returning();

    console.log('Attendees added:', newAttendees.length);

    // Adding RSVPs for each attendee to each event
    const data = newAttendees
      .map((attendee) =>
        newEvents.map((event) => ({
          attendeeId: attendee.id,
          eventId: event.id,
          status: 'going',
        }))
      )
      .flat();

    const newRSVPs = await db.insert(rsvps).values(data).returning();
    console.log('created rsvps ', newRSVPs.length);
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};

seedDatabase();
