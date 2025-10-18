'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/images/pardy.png';
import { Button } from '@nextui-org/react';
import { signout } from '@/actions/signout';
import { links } from '@/utils/constants';

const isActive = (path: string, route: string) => {
  if (route === '/dashboard') {
    return path === '/dashboard';
  } else {
    return path.includes(route);
  }
};
const Side = () => {
  const path = usePathname();
  const activeClass = 'bg-primary hover:bg-primary';

  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <figure className="w-[80px] pt-4 cursor-pointer">
          <Link href="/dashboard">
            <Image src={Logo} alt="pardy" />
          </Link>
        </figure>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={`w-full h-full py-2 px-2 hover:bg-content1 rounded-lg ${
                  isActive(path, link.route) ? activeClass : ''
                }`}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 w-full left-0 px-4">
        <Button onClick={() => signout()} fullWidth variant="ghost">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Side;
