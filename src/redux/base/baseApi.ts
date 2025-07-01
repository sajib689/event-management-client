/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { login, logout } from "../auth/userSlice";


// Backend base URL
const BASEAPI = "http://localhost:8094/api";
// const BASEAPI = "https://wnsdbmf9-3000.inc1.devtunnels.ms/api";

const baseQuery = fetchBaseQuery({
  baseUrl: BASEAPI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

// Handles token expiration and re-authentication
const baseQueryWithReauth = async (
  arg: string | FetchArgs,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery("/auth/refreshToken", api, extraOptions);

    if (refreshResult?.data) {
      const { accessToken, refreshToken, user } = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
        user: any;
      };

      api.dispatch(
        login({
          accessToken,
          refreshToken,
          user,
        })
      );

      result = await baseQuery(arg, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Main API instance
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});