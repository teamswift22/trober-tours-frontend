import { apiSlice } from "@/lib/api/apiSlice";

const agencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgencies: builder.query({
      query: (queryString) => ({
        url: `/agency/all${queryString}`,
      }),
    }),
    getAgency: builder.query({
      query: (id) => ({
        url: `/agency/${id}`,
      }),
    }),
    registerAgency: builder.mutation({
      query: (data) => ({
        url: "/agency",
        method: "POST",
        body: data,
      }),
    }),
    editAgency: builder.mutation({
      query: ({ body, agencyId }) => ({
        url: `/agency/edit?agencyId=${agencyId}`,
        method: "PATCH",
        body,
      }),
    }),
    editAgencySocials: builder.mutation({
      query: ({ body, agencyId }) => ({
        url: `/agency/editSocials?agencyId=${agencyId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAgenciesQuery,
  useGetAgencyQuery,
  useRegisterAgencyMutation,
  useEditAgencyMutation,
  useEditAgencySocialsMutation,
} = agencyApiSlice;
