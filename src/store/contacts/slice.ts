import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDto } from "src/types/dto/ContactDto";

interface ContactsState {
  contactsList: ContactDto[];
  filteredContacts: ContactDto[];
}

const initialState: ContactsState = {
  contactsList: [],
  filteredContacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<ContactDto[]>) => {
      state.contactsList = action.payload;
      state.filteredContacts = action.payload;
    },
    filterContacts: (
      state,
      action: PayloadAction<{ contacts: ContactDto[] }>
    ) => {
      state.filteredContacts = action.payload.contacts;
    },
  },
});
