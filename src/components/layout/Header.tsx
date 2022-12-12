import Image from 'next/image';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/', label: 'All Pokemons' },
  { href: '/pokemon', label: 'Find Pokemon' },
];

export default function Header() {
  return (
    <header className='sticky top-0 z-50 mb-4 bg-slate-200 py-2 shadow-lg'>
      <div className='layout flex h-14 items-center justify-between'>
        <div className='flex items-center'>
          <Image
            src='/images/poke_ball.png'
            alt='peke_ball'
            width={40}
            height={40}
          />
          <UnstyledLink
            href='/'
            className='flex justify-center font-bold hover:text-gray-600'
          >
            <div className='ml-4'>Pokedex</div>
          </UnstyledLink>
        </div>
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
