'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/images/pardy.png';
import { Button } from '@nextui-org/react';
import { signout } from '@/actions/signout';
import { links } from '@/utils/constants';
import { cn } from '@nextui-org/react';

const isActive = (path: string, route: string) => {
  return route === '/dashboard' ? path === '/dashboard' : path.includes(route);
};

const Side = ({ onClose }: { onClose: () => void }) => {
  const path = usePathname();
  const activeClass = 'bg-primary hover:bg-primary';

  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-8 lg:mb-12">
        <figure className="w-[60px] lg:w-[80px] pt-4 cursor-pointer">
          <Link href="/dashboard">
            <Image src={Logo} alt="pardy" />
          </Link>
        </figure>
      </div>
      <div className="space-y-1">
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route} onClick={onClose}>
              <div
                className={cn(
                  'w-full h-full py-3 px-3 hover:bg-content1 rounded-lg text-sm lg:text-base transition-colors',
                  isActive(path, link.route) && activeClass
                )}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 w-full left-0 px-4">
        <Button
          onClick={() => signout()}
          fullWidth
          variant="ghost"
          size="sm"
          className="text-sm"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Side;
