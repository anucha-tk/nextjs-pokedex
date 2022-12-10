import Image from 'next/image';
import React from 'react';

import Paginate from '@/components/paginate/paginate';

import { useGetPokemonNamesQuery } from '@/store/slices/pokemonSlice';

function Pokemons() {
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
  const [page, setPage] = React.useState<number>(0);
  const { data: pokemons } = useGetPokemonNamesQuery(page);
  return (
    <>
      <section id='pokemons' className='mx-8 mb-6 grid gap-4 lg:grid-cols-3'>
        {pokemons?.map((pokemon) => {
          const types = pokemon.types.map((e) => e.type.name);
          const states = pokemon.stats.map((e) => e);
          return (
            <div
              key={pokemon.id}
              className='h-fit w-full rounded-lg border p-4 shadow-md hover:bg-gray-100'
            >
              <h5 className='text-2xl font-bold uppercase tracking-tight text-gray-900'>
                {pokemon.name}
              </h5>

              <div className='grid h-full w-full grid-rows-2 items-center justify-center sm:grid-cols-2 sm:grid-rows-none'>
                <div className='relative h-full w-full'>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt='pokemon'
                    objectFit='cover'
                    layout='fill'
                    priority
                  />
                </div>
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
        <div className='flex justify-center'>
          <Paginate page={page} setPage={setPage} />
        </div>
      </section>
    </>
  );
}

export default Pokemons;
