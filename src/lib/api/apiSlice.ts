import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, setUser, login, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Helper function to refresh access token
const refreshAccessToken = async (api: any, extraOptions: any) => {
  try {
    const refreshResult = await baseQuery(
      "/agency-auth/refresh-token",
      api,
      extraOptions
    );
    return refreshResult;
  } catch (error) {
    throw error;
  }
};

const baseQueryWithReath = async (args: any, api: any, extraOptions: any) => {
  const { dispatch } = api;

  try {
    let result = await baseQuery(args, api, extraOptions);

    // Check if the result indicates an unauthorized error (401)
    if (result.error && result.error.status === 401) {
      const persistedData = localStorage.getItem("persistedData");

      if (!persistedData) {
        // Attempt to refresh token
        const refreshResult = await refreshAccessToken(api, extraOptions);

        if (refreshResult?.data) {
          // Update persisted data with new token
          localStorage.setItem(
            "persistedData",
            JSON.stringify(refreshResult.data)
          );
          dispatch(login({ ...refreshResult.data }));

          // Retry original query with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token failed, perform logout
          localStorage.removeItem("persistedData");
          dispatch(logout());
        }
      } else {
        // Use persisted data to authenticate
        const parsedData = JSON.parse(persistedData);
        dispatch(login(parsedData));

        // Retry original query with existing token
        result = await baseQuery(args, api, extraOptions);

        // If still unauthorized, attempt token refresh
        if (result.error && result.error.status === 401) {
          const refreshResult = await refreshAccessToken(api, extraOptions);

          if (refreshResult?.data) {
            // Update persisted data with new token
            localStorage.setItem(
              "persistedData",
              JSON.stringify(refreshResult.data)
            );
            dispatch(login({ ...refreshResult.data }));

            // Retry original query with new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Refresh token failed, perform logout
            localStorage.removeItem("persistedData");
            dispatch(logout());
          }
        }
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReath,
  tagTypes: ["User", "Agency-Member", "Agency", "Tours", "Activities"],
  endpoints: (builder) => ({}),
});
