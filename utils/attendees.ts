import 'server-only';
import { db } from '@/db/db';
import { attendees, events, rsvps } from '@/db/schema';
import { memoize } from 'nextjs-better-unstable-cache';
import { eq, sql } from 'drizzle-orm';

export const getAttendeesCountForDashboard = memoize(
  async (userId: string) => {
    const counts = await db
      .select({
        totalAttendees: sql`count(distinct ${attendees.id})`,
      })
      .from(events)
      .leftJoin(rsvps, eq(rsvps.eventId, events.id))
      .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
      .where(eq(events.createdById, userId))
      .groupBy(events.id)
      .execute();

    const total = counts.reduce(
      (acc, count) => acc + (count.totalAttendees as number),
      0
    );
    return total;
  },
  {
    persist: true,
    revalidateTags: () => ['dashboard:attendees'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:attendees',
  }
);

// export const getGuestList = memoize(
//   async (userId: string) => {
//     const uniqueAttendees = await db
//       .selectDistinct({
//         id: attendees.id,
//         name: attendees.name,
//         email: attendees.email,
//       })
//       .from(events)
//       .leftJoin(rsvps, eq(rsvps.eventId, events.id))
//       .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
//       .where(eq(events.createdById, userId))
//       .execute();

//     return uniqueAttendees.filter(
//       (guest) => guest.id !== undefined && guest.id !== null
//     );
//   },
//   {
//     persist: true,
//     revalidateTags: () => ['guests'],
//     suppressWarnings: true,
//     log: ['datacache', 'verbose'],
//     logid: 'guests',
//   }
// );

export const getGuestList = memoize(
  async (userId: string) => {
    const allAttendees = await db
      .select({
        id: attendees.id,
        name: attendees.name,
        email: attendees.email,
      })
      .from(attendees)
      .execute();

    return allAttendees.filter(
      (guest) => guest.id !== undefined && guest.id !== null
    );
  },
  {
    persist: true,
    revalidateTags: () => ['guests'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'guests',
  }
);
