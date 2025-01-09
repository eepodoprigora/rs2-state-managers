import { favoritesSlice } from "./slice";

export const { setFavoriteContacts } = favoritesSlice.actions;

export const favouritesReducer = favoritesSlice.reducer;
