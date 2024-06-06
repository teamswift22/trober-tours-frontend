import { apiSlice } from "@/lib/api/apiSlice";

const subscriberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/subscriber/${tourId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscriber"],
    }),
    addSubscriber: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/subscriber/tour/add/${tourId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscriber"],
    }),
    getAgencySubscribers: builder.query({
      query: ({ agencyId }) => `/subscription?agency=${agencyId}`,
      providesTags: ["Subscriber"],
    }),
    getTourSubscribers: builder.query({
      query: (tourId) => `/subscription/${tourId}`,
      providesTags: ["Subscriber"],
    }),
    getSubscribersTourSubscriptions: builder.query({
      query: (subscriberId) =>
        `/subscription/participant?subscriberId=${subscriberId}`,
      providesTags: ["Subscriber"],
    }),
    sendNotificationToSubscribers: builder.mutation({
      query: ({ body }) => ({
        url: `/subscriber/notify`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateSubscriberMutation,
  useGetAgencySubscribersQuery,
  useGetTourSubscribersQuery,
  useAddSubscriberMutation,
  useGetSubscribersTourSubscriptionsQuery,
  useSendNotificationToSubscribersMutation,
} = subscriberApiSlice;
