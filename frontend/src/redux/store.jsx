import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import bookApi from "./features/book/bookAPI";
import orderApi from "./features/order/orderApi";

export const store = configureStore({
  reducer: {
    // cart ชื่อต้องตรงกับname ในCartSlice
    cart: cartReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, orderApi.middleware),
});
setupListeners(store.dispatch);
