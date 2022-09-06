import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export type Pokemon = {
  name: string;
  url: string;
};

type PokeApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

type PokeNameApiResponse = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
};

export const pokeApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonNames: builder.query<PokeNameApiResponse[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const fetchAllPokemons = await fetchWithBQ(`/pokemon/?limit=5`);
        if (fetchAllPokemons.error)
          return { error: fetchAllPokemons.error as FetchBaseQueryError };

        const res = fetchAllPokemons.data as PokeApiResponse;
        const pokemonNames = res.results.map((e) => e.name);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pokemons: any = await Promise.all(
          pokemonNames.map(async (e) => {
            const res = await fetchWithBQ(`/pokemon/${e}`);
            return res.data;
          })
        );
        return pokemons
          ? { data: pokemons as PokeNameApiResponse[] }
          : { error: pokemons.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useGetPokemonNamesQuery } = pokeApiSlice;
