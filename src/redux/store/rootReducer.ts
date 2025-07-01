import { baseApi } from "../base/baseApi";
import  userSlice  from '../auth/userSlice';

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: userSlice,
};