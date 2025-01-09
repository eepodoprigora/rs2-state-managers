import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/data/" }),
  endpoints: (builder) => ({
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => "groups.json",
    }),
    getGroup: builder.query<GroupContactsDto | undefined, string>({
      query: () => "groups.json",
      transformResponse: (response: GroupContactsDto[], _, arg) =>
        response.find((group) => group.id === arg),
    }),
  }),
});
