import { apiSlice } from "@/lib/api/apiSlice";

const agencyMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyMember: builder.query({
      query: (id?: string) => `/agency-member/member?id=${id}`,
    }),
    editAgencyMember: builder.mutation({
      query: ({ id, body }) => ({
        url: `/agency-member/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useGetAgencyMemberQuery, useEditAgencyMemberMutation } =
  agencyMemberApiSlice;
