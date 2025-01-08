import { DATA_CONTACT } from "src/__data__";
import { AppDispatch, RootState } from "..";
import { FETCH_CONTACTS_SUCCESS } from "./contactActions";

export const FETCH_FAVOURITES = "GET_FAVOURITES";

export const fetchFavourites =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch({ type: FETCH_FAVOURITES });
    const { contacts } = getState().contacts;

    if (!contacts.length) {
      const data = DATA_CONTACT;
      dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: data });
    }

    let favourites = contacts.slice(0, 4).map((contact) => contact.id);

    console.log(favourites);

    dispatch({
      type: FETCH_FAVOURITES,
      payload: favourites,
    });
  };
