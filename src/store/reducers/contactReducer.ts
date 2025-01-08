import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { ContactDto } from "src/types/dto/ContactDto";
import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_ERROR,
  FILTER_CONTACTS,
  FIND_CONTACT,
} from "../actions/contactActions";
import { ActionType } from "../actions";

export interface ContactsState {
  contacts: ContactDto[];
  filteredContacts: ContactDto[];
  groupContacts: GroupContactsDto[];
  selectedContact: ContactDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  filteredContacts: [],
  groupContacts: [],
  selectedContact: null,
  loading: false,
  error: null,
};

export const contactReducer = (
  state = initialState,
  action: ActionType
): ContactsState => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, loading: true, error: null };
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        filteredContacts: action.payload,
      };
    case FETCH_CONTACTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FILTER_CONTACTS:
      return { ...state, filteredContacts: action.payload };
    case FIND_CONTACT:
      return { ...state, selectedContact: action.payload };
    default:
      return state || initialState;
  }
};
