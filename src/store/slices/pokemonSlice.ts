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
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export const pokeApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokemon'],
  // todo Excessive use of memory and CPU
  // todo https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md#excessive-use-of-memory-and-cpu
  endpoints: (builder) => ({
    getPokemonNames: builder.query<PokeNameApiResponse[], number>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const limit = 3;
        const page = limit * _arg;
        const fetchAllPokemons = await fetchWithBQ(
          `/pokemon/?limit=3&offset=${page}`
        );
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
