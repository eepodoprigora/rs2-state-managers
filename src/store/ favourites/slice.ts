import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";

interface FavoritesState {
  favoriteContacts: FavoriteContactsDto;
}

const initialState: FavoritesState = {
  favoriteContacts: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoriteContacts: (
      state,
      action: PayloadAction<FavoriteContactsDto>
    ) => {
      state.favoriteContacts = action.payload;
    },
  },
});
