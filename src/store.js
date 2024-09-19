import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./ItemSlice"
import authReducer from './AuthSlice'

export default configureStore({
  reducer: {
    itemsManager: itemsReducer,
    authSlice: authReducer,
  },
});
