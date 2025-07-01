import { baseApi } from "@/redux/base/baseApi";
import { TUser } from '../../../type/global';

interface AuthResponse {
  accessToken: string;
  user: TUser;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register User
    registerUser: builder.mutation<AuthResponse, Partial<TUser>>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login User
    loginUser: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
