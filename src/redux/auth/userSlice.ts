import { TUser } from "@/type/global";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  paymetMethod?: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  paymetMethod: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        user: TUser | null | string;
        accessToken?: string | null;
        refreshToken?: string | null;
      }>
    ) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user && user !== "null" && typeof user !== "string" ? user : null;
      state.accessToken = accessToken && accessToken !== "null" ? accessToken : null;
      state.refreshToken = refreshToken && refreshToken !== "null" ? refreshToken : null;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      // Optional: clear from localStorage if using redux-persist
      if (typeof window !== "undefined") {
        localStorage.removeItem("persist:auth");
        window.location.href = "/auth/login";
      }
    },

    setPaymentMethod: (state, action: PayloadAction<boolean>) => {
      state.paymetMethod = action.payload;
    },
  },
});

export const { login, logout, setPaymentMethod } = authSlice.actions;
export default authSlice.reducer;
