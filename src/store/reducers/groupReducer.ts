import { GroupContactsDto } from "src/types/dto/GroupContactsDto";
import { FETCH_GROUP_CONTACTS } from "../actions/groupActions";
import { ActionType } from "../actions";

export interface GroupState {
  groupsList: GroupContactsDto[];
}

const initialState: GroupState = {
  groupsList: [] as GroupContactsDto[],
};

export const groupReducer = (
  state = initialState,
  action: ActionType
): GroupState => {
  switch (action.type) {
    case FETCH_GROUP_CONTACTS:
      return { ...state, groupsList: action.payload };

    default:
      return state;
  }
};
