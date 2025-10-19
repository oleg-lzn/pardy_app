'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/users';
import { db } from '@/db/db';
import { signin, signup, createSession } from '@/utils/authTools';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import { hash } from 'node:crypto';

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignInData = z.infer<typeof SignInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export const registerUser = async (prevState: any, formData: FormData) => {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    const validatedData = SignUpSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Validation Failed',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const { email, password } = validatedData.data;
    const result = await signup({ email, password });
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    await createSession(result.token as string);
  } catch (e) {
    console.error(e);
    return {
      message: 'Nah! Failed to signup',
    };
  }
  redirect('/dashboard');
};

export const signinUser = async (prevState: any, formData: FormData) => {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const validatedData = SignInSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        success: false,
        message: 'Validation Failed',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }
    const { email, password } = validatedData.data;
    const result = await signin({ email, password });
    if (!result) {
      return { message: 'Invalid credentials' };
    }
    await createSession(result.token);
  } catch (e) {
    console.error(e);
    return {
      message: 'Nah! Failed to sign in',
    };
  }
  redirect('/dashboard');
};
