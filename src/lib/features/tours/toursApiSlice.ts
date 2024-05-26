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
    addStop: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/tour/stops/${tourId}`,
        method: "POST",
        body,
      }),
    }),
    editStop: builder.mutation({
      query: ({ stopId, body }) => ({
        url: `/tour/stops/${stopId}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteStop: builder.mutation({
      query: (id) => ({
        url: `/tour/stops/${id}`,
        method: "DELETE",
      }),
    }),
    getAllStops: builder.query({
      query: (id) => `/tour/stops/${id}`,
    }),
    addActivity: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/tour/activities/${tourId}`,
        method: "POST",
        body,
      }),
    }),
    editActivity: builder.mutation({
      query: ({ activityId, body }) => ({
        url: `/tour/activities/edit/${activityId}`,
        method: "PATCH",
        body,
      }),
    }),
    getActivities: builder.query({
      query: (id) => `/tour/activities/${id}`,
    }),
    fetchAccommodation: builder.query({
      query: ({ location, radius, type }) => {
        const params = new URLSearchParams({
          lat: location.lat,
          lng: location.lng,
          radius: radius.toString(),
          type,
        });

        return {
          url: `/tour/accommodationSuggestions?${params.toString()}`,
        };
      },
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetTourQuery,
  useGetToursQuery,
  useEditTourMutation,
  useAddStopMutation,
  useEditStopMutation,
  useDeleteStopMutation,
  useGetAllStopsQuery,
  useAddActivityMutation,
  useEditActivityMutation,
  useGetActivitiesQuery,
  useFetchAccommodationQuery,
} = tourApiSlice;
