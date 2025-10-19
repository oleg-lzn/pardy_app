'use client';

import { Input } from '@nextui-org/react';
import { createNewEvent } from '@/actions/events';
import { Button, Tooltip } from '@nextui-org/react';
import { CirclePlus, Menu } from 'lucide-react';
import { useTransition } from 'react';

const Nav = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await createNewEvent();
    });
  };

  return (
    <nav className="h-[65px] border-b border-default-50 flex items-center px-4 lg:px-6 gap-2 lg:gap-4">
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button isIconOnly variant="ghost" size="sm" onClick={onMenuClick}>
          <Menu size={16} />
        </Button>
      </div>

      {/* New Event button */}
      <div>
        <Tooltip content="New Event">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            isLoading={isPending}
            onClick={handleClick}
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>

      {/* Search input */}
      <div className="flex-1 lg:w-1/2">
        <Input
          size="sm"
          variant="faded"
          placeholder="search"
          className="w-full"
        />
      </div>
    </nav>
  );
};

export default Nav;
