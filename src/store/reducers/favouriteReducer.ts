import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
import { FETCH_FAVOURITES } from "../actions/favouriteactions";
import { ActionType } from "../actions";

export interface FavoriteState {
  favoriteContacts: FavoriteContactsDto;
}

const initialState: FavoriteState = {
  favoriteContacts: [],
};

export const favoriteReducer = (
  state = initialState,
  action: ActionType
): FavoriteState => {
  switch (action.type) {
    case FETCH_FAVOURITES:
      return {
        ...state,
        favoriteContacts: action.payload,
      };
    default:
      return state;
  }
};
