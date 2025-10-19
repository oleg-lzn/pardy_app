'use server';

import { db } from '@/db/db';
import { attendees } from '@/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/utils/users';
import { revalidateTag } from 'next/cache';

const GuestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export const createGuest = async (prevState: any, formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    return { message: 'Unauthorized' };
  }

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
  };

  const validatedData = GuestSchema.safeParse(data);
  if (!validatedData.success) {
    return { message: 'Validation Failed' };
  }

  const existingGuest = await db
    .select()
    .from(attendees)
    .where(eq(attendees.email, validatedData.data.email));
  if (existingGuest.length > 0) {
    return { message: 'Guest already exists' };
  }

  const guest = await db
    .insert(attendees)
    .values({
      name: validatedData.data.name,
      email: validatedData.data.email,
    })
    .returning();
  revalidateTag('guests');

  return { message: 'Guest created successfully', guest: guest[0] };
};
