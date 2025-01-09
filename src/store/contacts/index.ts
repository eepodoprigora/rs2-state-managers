import { contactsApi } from "./api";
import { contactsSlice } from "./slice";

export const contactsReducer = contactsSlice.reducer;

export const contactsApiReducer = contactsApi.reducer;
export const contactsApiReducerPath = contactsApi.reducerPath;
export const contactsApiMiddleware = contactsApi.middleware;

export const { useGetContactsQuery, useGetContactQuery } = contactsApi;

export const { setContacts, filterContacts } = contactsSlice.actions;
