import Image from 'next/image';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/route', label: 'Route 1' },
  { href: '/', label: 'Route 2' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink href='/' className='flex font-bold hover:text-gray-600'>
          <div className='mr-2'>
            <Image
              src='/images/poke_ball.png'
              alt='peke_ball'
              width={20}
              height={20}
            />
          </div>
          Pokemon
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className='hover:text-gray-600'>
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
