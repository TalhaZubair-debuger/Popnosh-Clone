import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import userReducer from "./users/userSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
