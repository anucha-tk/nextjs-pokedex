# PokeApi

this project is create from nextjs + tailwind css and PokeApi.co

# Tech stack

- Front end: [NextJS](https://nextjs.org/)
- Css: [Tailwind css](https://tailwindcss.com/)
- Api: [pokeapi](https://pokeapi.co/)
- state management & api Cache: [Redux toolkit RTK](https://redux-toolkit.js.org/)

# Table of contents

- [PokeApi](#pokeapi)
- [Tech stack](#tech-stack)
- [Table of contents](#table-of-contents)
- [Features and Tactical](#features-and-tactical)
  - [Custom Redux toolkit RTK Query and Paginate](#custom-redux-toolkit-rtk-query-and-paginate)
- [Roadmap](#roadmap)

# Features and Tactical

## Custom Redux toolkit RTK Query and Paginate

**Problem:** when we get [https://pokeapi.co/api/v2/pokemon/](https://pokeapi.co/api/v2/pokemon/) image by pokemon id not found,

<details>
<summary>Response from Api</summary>

```json
{
  "count": 1154,
  "next": "https://pokeapi.co/api/v2/pokemon/?offset=5&limit=5",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "charmeleon",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    }
  ]
}
```

</details>

**solve:** we use queryFn() for multiple query on single RTK query

<details>
<summary>Response api with queryFn()</summary>

```json
{
  data: [
    {
      abilities: {},
      name: {},
      species: {}
      sprites: {}, // <-- 👈 pokemon images there're here
    },
    {...},
  ]
}
```

</details>

> `hint` ⚠️ queryFn return {data: ...} or {error: ...}

```typescript
// store/slices/pokemonSlice.ts
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
```

# Roadmap

- [x] State management with Redux toolkit RTK
- [x] Pagination
- [ ] Single pokemon character
