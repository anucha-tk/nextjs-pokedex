import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Paginate from '@/components/paginate/paginate';

import { useGetPokemonNamesQuery } from '@/store/slices/pokemonSlice';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const emoji: { [key: string]: string } = {
  grass: '🍃',
  poison: '🧪',
  hp: '❤️',
  attack: '⚔',
  defense: '🛡️',
  'special-attack': '💥',
  'special-defense': '🔰',
  speed: '🚀',
  height: '📏',
  weight: '⚖️',
  types: '🔡',
};

export default function HomePage() {
  const [page, setPage] = React.useState<number>(0);
  const { data: pokemons } = useGetPokemonNamesQuery(page);

  return (
    <Layout>
      <div className='mx-8 mb-6 grid gap-4 lg:grid-cols-3'>
        {pokemons?.map((pokemon) => {
          const types = pokemon.types.map((e) => e.type.name);
          const states = pokemon.stats.map((e) => e);
          return (
            <div
              key={pokemon.id}
              className='rounded-lg border p-4 shadow-md hover:bg-gray-100'
            >
              <h5 className='text-2xl font-bold uppercase tracking-tight text-gray-900'>
                {pokemon.name}
              </h5>

              <div className='flex flex-col items-center justify-center sm:flex-row'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt='pokemon'
                  width={150}
                  height={150}
                />
                <div className='p-4'>
                  {states.map(({ stat, base_stat }) => (
                    <h5
                      key={stat.name}
                      className='mb-2 font-bold text-gray-700'
                    >
                      <span className='mr-3'>{emoji[stat.name]}</span>
                      <span>
                        {stat.name.toUpperCase()}: {base_stat}
                      </span>
                    </h5>
                  ))}
                  <h5 className='mb-2 font-bold text-gray-700'>
                    <span className='mr-3'>{emoji['height']}</span>
                    Height: {pokemon.height}
                  </h5>
                  <h5 className='mb-2 font-bold text-gray-700'>
                    <span className='mr-3'>{emoji['weight']}</span>
                    weight: {pokemon.weight}
                  </h5>
                  <h5 className='mb-2 font-bold text-gray-700'>
                    <span className='mr-3'>{emoji['types']}</span>
                    Types:{' '}
                    {types.map((name) => (
                      <span key={name}>
                        {emoji[name]} {name}
                      </span>
                    ))}
                  </h5>
                  <p></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <Paginate page={page} setPage={setPage} />
      </div>
    </Layout>
  );
}
