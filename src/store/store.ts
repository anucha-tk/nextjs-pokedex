import { configureStore } from '@reduxjs/toolkit';

import { pokemonJSONApi } from '@/store/slices/pokemonJsonSlice';
import { pokeApiSlice } from '@/store/slices/pokemonSlice';

const rootReducers = {
  [pokeApiSlice.reducerPath]: pokeApiSlice.reducer,
  [pokemonJSONApi.reducerPath]: pokemonJSONApi.reducer,
};

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([pokeApiSlice.middleware, pokemonJSONApi.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
