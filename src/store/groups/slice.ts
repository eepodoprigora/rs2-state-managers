import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

interface GroupsState {
  groupsList: GroupContactsDto[];
}

const initialState: GroupsState = {
  groupsList: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<GroupContactsDto[]>) => {
      state.groupsList = action.payload;
    },
  },
});
