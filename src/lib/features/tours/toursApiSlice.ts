import { apiSlice } from "@/lib/api/apiSlice";

const tourApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query({
      query: (params?: string) => `/tour?search=${params}`,
    }),
    getTour: builder.query({
      query: (id) => `/tour/${id}`,
    }),
    createTour: builder.mutation({
      query: (body) => ({
        url: "/tour",
        method: "POST",
        body,
      }),
    }),
    editTour: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tour/edit/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    createActivity: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/tour/activities/${tourId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetTourQuery,
  useGetToursQuery,
  useEditTourMutation,
} = tourApiSlice;
