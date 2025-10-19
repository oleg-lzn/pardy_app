'use server';

import { db } from '@/db/db';
import { events } from '@/db/schema';
import { getCurrentUser } from '@/utils/users';
import randomName from '@scaleway/random-name';
import { revalidateTag } from 'next/cache';

export const createNewEvent = async () => {
  const user = await getCurrentUser();
  const start = new Date(2020, 0, 1);
  const end = new Date(2029, 11, 31);

  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  await db.insert(events).values({
    startOn: randomDate.toISOString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('Event', ' '),
    description: randomName('Cool Event', ' '),
  });

  revalidateTag('events');
  revalidateTag('dashboard:events');
};
