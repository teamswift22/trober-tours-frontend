import { apiSlice } from "@/lib/api/apiSlice";

const agencyMemberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyMember: builder.query({
      query: (id?: string) => `/agency-member/member?id=${id}`,
      providesTags: ["Agency-Member"],
    }),
    addAgencyMember: builder.mutation({
      query: (data) => ({
        url: "/agency-member/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Agency-Member"],
    }),
    updateAgencyMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agency-member/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Agency-Member"],
    }),
    getAgencyMembers: builder.query({
      query: () => `/agency-member`,
      providesTags: ["Agency-Member"],
    }),
  }),
});

export const {
  useGetAgencyMemberQuery,
  useGetAgencyMembersQuery,
  useAddAgencyMemberMutation,
  useUpdateAgencyMemberMutation,
} = agencyMemberApiSlice;
