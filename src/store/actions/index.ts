import { FETCH_GROUP_CONTACTS } from "./groupActions";
import { FETCH_FAVOURITES } from "./favouriteactions";
import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FILTER_CONTACTS,
  FIND_CONTACT,
} from "./contactActions";
import { ContactDto } from "src/types/dto/ContactDto";
import { FavoriteContactsDto } from "src/types/dto/FavoriteContactsDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export interface FetchContactsAction {
  type: typeof FETCH_CONTACTS;
}

export interface FetchContactsSuccessAction {
  type: typeof FETCH_CONTACTS_SUCCESS;
  payload: ContactDto[];
}

export interface FetchContactsErrorAction {
  type: typeof FETCH_CONTACTS_ERROR;
  payload: string;
}

export interface FilterContactsAction {
  type: typeof FILTER_CONTACTS;
  payload: ContactDto[];
}

export interface FindContactAction {
  type: typeof FIND_CONTACT;
  payload: ContactDto;
}

export interface FetchFavouritesAction {
  type: typeof FETCH_FAVOURITES;
  payload: FavoriteContactsDto;
}

export interface FetchGroupContactsAction {
  type: typeof FETCH_GROUP_CONTACTS;
  payload: GroupContactsDto[];
}

export type ActionType =
  | FetchContactsAction
  | FetchContactsSuccessAction
  | FetchContactsErrorAction
  | FilterContactsAction
  | FindContactAction
  | FetchFavouritesAction
  | FetchGroupContactsAction;
