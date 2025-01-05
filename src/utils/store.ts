import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../helper/redux/AuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})