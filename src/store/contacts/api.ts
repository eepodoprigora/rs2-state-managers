import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactDto } from "src/types/dto/ContactDto";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/data/" }),
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => "contacts.json",
    }),
    getContact: builder.query({
      query: (contactId) => "contacts.json",
      transformResponse: (response: ContactDto[], _, arg) =>
        response.find((contact) => contact.id === arg),
    }),
  }),
});
