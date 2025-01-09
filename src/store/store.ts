import { configureStore } from "@reduxjs/toolkit";

import {
  contactsReducer,
  contactsApiMiddleware,
  contactsApiReducer,
  contactsApiReducerPath,
} from "./contacts";
import { combineReducers } from "redux";
import {
  groupsReducer,
  groupsApiReducer,
  groupsApiReducerPath,
  groupsApiMiddleware,
} from "./groups";
import { favouritesReducer } from "./ favourites";

const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  favourites: favouritesReducer,
  [contactsApiReducerPath]: contactsApiReducer,
  [groupsApiReducerPath]: groupsApiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([contactsApiMiddleware, groupsApiMiddleware]),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
