'use client';

import { useFormState } from 'react-dom';
import { Button, Input } from '@nextui-org/react';
import Submit from './Submit';
import { createGuest } from '@/actions/guests';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const initState = { message: null, guest: null };

type Guest = {
  name: string;
  id: string;
  email: string;
  createdAt: string;
};

const GuestForm = () => {
  const router = useRouter();
  const [formState, createGuestAction] = useFormState<{
    message: string | null;
    guest: Guest | null;
  }>(createGuest, initState);

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md w-full space-y-4">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Back to Guests List
          </Button>
        </div>

        <div className="py-6 px-8 border border-divider rounded-lg bg-content1">
          <form action={createGuestAction} className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-foreground mb-4">
              Create Guest
            </h3>
            <Input
              fullWidth
              required
              size="lg"
              placeholder="Name"
              name="name"
              type="text"
              className="mb-4"
            />
            <Input
              name="email"
              fullWidth
              required
              size="lg"
              type="email"
              placeholder="Email"
              className="mb-6"
            />
            <Submit label={'Create Guest'} />
            {formState?.message && (
              <p className="text-danger text-sm text-center mt-4">
                {formState.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
