import { groupsSlice } from "./slice";
import { groupsApi } from "./api";

export const groupsReducer = groupsSlice.reducer;

export const groupsApiReducer = groupsApi.reducer;
export const groupsApiReducerPath = groupsApi.reducerPath;
export const groupsApiMiddleware = groupsApi.middleware;

export const { useGetGroupsQuery, useGetGroupQuery } = groupsApi;

export const { setGroups } = groupsSlice.actions;
