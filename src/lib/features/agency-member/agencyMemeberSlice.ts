import { apiSlice } from "@/lib/api/apiSlice";

const agencyMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyMember: builder.query({
      query: (id?: string) => `/agency-member/member?id=${id}`,
    }),
  }),
});

export const { useGetAgencyMemberQuery } = agencyMemberApiSlice;
