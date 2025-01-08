import { FilterFormValues } from "src/components/FilterForm";
import { AppDispatch, RootState } from "..";
import { DATA_CONTACT } from "src/__data__";
import { delay } from "src/constants";
import { ContactDto } from "src/types/dto/ContactDto";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const FETCH_CONTACTS = "FETCH_CONTACTS";
export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCH_CONTACTS_ERROR = "FETCH_CONTACTS_ERROR";
export const FILTER_CONTACTS = "FILTER_CONTACTS";

export const FIND_CONTACT = "FIND_CONTACT";

export const fetchContacts = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_CONTACTS });

  try {
    await delay(1000);
    const data = DATA_CONTACT;
    dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Что-то пошло не так";
    dispatch({ type: FETCH_CONTACTS_ERROR, payload: errorMessage });
  }
};

export const filterContacts =
  (filterValues: Partial<FilterFormValues>) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { contacts } = getState().contacts;
    let filteredContacts = contacts;

    if (filterValues.name) {
      const nameLower = filterValues.name.toLowerCase();
      filteredContacts = filteredContacts.filter((contact: ContactDto) =>
        contact.name.toLowerCase().includes(nameLower)
      );
    }

    if (filterValues.groupId) {
      const group = getState().groups.groupsList.find(
        (g: GroupContactsDto) => g.id === filterValues.groupId
      );
      if (group) {
        filteredContacts = filteredContacts.filter((contact: ContactDto) =>
          group.contactIds.includes(contact.id)
        );
      }
    }

    dispatch({
      type: FILTER_CONTACTS,
      payload: filteredContacts,
    });
  };

export const fetchContact =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { contacts } = getState().contacts;

    if (!contacts.length) {
      const data = DATA_CONTACT;
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data });
    }
    let selectedContact = contacts.find((contact) => contact.id === id);

    dispatch({
      type: FIND_CONTACT,
      payload: selectedContact,
    });
  };
