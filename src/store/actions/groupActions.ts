import { DATA_GROUP_CONTACT } from "src/__data__";
import { AppDispatch } from "..";
import { delay } from "src/constants";

export const FETCH_GROUP_CONTACTS = "FETCH_GROUP_CONTACTS";

export const fetchGroupContacts = () => async (dispatch: AppDispatch) => {
  try {
    await delay(1000);
    const data = DATA_GROUP_CONTACT;
    dispatch({
      type: FETCH_GROUP_CONTACTS,
      payload: data,
    });
  } catch (error) {
    console.error("Ошибка при загрузке групп контактов:", error);
  }
};
