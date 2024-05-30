import { apiSlice } from "@/lib/api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/agency-auth/create-agency-member",
        method: "POST",
        body: credentials,
      }),
    }),
    setPin: builder.mutation({
      query: (credentials) => ({
        url: "/agency-member/pin",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/agency-auth/login-agency-member",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/agency-auth/logout-agency-member",
        method: "GET",
      }),
    }),
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: "/common/send-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (credentials) => ({
        url: "/common/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useSetPinMutation,
  useLoginMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
} = authApiSlice;
