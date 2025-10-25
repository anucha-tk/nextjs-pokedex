import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonJSONApi = createApi({
	reducerPath: "pokemonJSONApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api/staticdata",
	}),
	tagTypes: ["PokemonNameJSON"],
	endpoints: (builder) => ({
		getPokemonNameJSON: builder.query<string[], void>({
			query: () => "/",
			transformResponse: (baseQueryReturnValue: string) =>
				JSON.parse(baseQueryReturnValue),
		}),
	}),
});

export const { useGetPokemonNameJSONQuery } = pokemonJSONApi;
