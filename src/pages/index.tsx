import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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

export default function HomePage() {
  const { data: pokemons } = useGetPokemonNamesQuery();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <div className=''>
        {pokemons?.map((pokemon) => (
          <div key={pokemon.id}>
            <p>{pokemon.name}</p>
            <Image
              src={pokemon.sprites.front_default}
              alt='pokemon'
              width={150}
              height={150}
            />
            {/* <p>{pokemon.sprites.}</p> */}
          </div>
        ))}
      </div>
    </Layout>
  );
}
