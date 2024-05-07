import { apiSlice } from "@/lib/api/apiSlice";

const subscriberApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation({
      query: ({ tourId, body }) => ({
        url: `/subscriber/${tourId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

const { useCreateSubscriberMutation } = subscriberApiSlice;
