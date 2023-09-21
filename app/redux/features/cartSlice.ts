//@/app/redux/features/cartSlice.ts
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Producto } from "@prisma/client";
import { RootState } from "../store";
import { CartItem } from "@/types";

export interface CartState {
  cartItems: CartItem[];
}
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Producto>) => {
      const cartItem = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );
      if (!cartItem) {
        state.cartItems.push({
          product: action.payload,
          qty: 1,
        });
      }
      if (cartItem && cartItem.qty < action.payload.stock) cartItem.qty++;
    },

    decrement: (state, action: PayloadAction<Producto>) => {
      const cartItem = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );
      if (cartItem) {
        cartItem.qty--;
        if (cartItem.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) => el.product.id !== action.payload.id
          );
        }
      }
    },

    resetCartItems: (state) => {
      return {
        cartItems: [],
      };
    },
  },
});

const cartItems = (state: RootState) => state.cart.cartItems;

export const productQtyInCartSelector = createSelector(
  [cartItems, (cartItems, productId: number) => productId],
  (cartItems, productId) =>
    cartItems.find((el) => el.product.id === productId)?.qty
);

export const totalCartItemsSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, curr: CartItem) => (total += curr.qty), 0)
);
export const TotalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, curr: CartItem) =>
      (total += curr.qty * curr.product.precio),
    0
  )
);

export const { increment, decrement, resetCartItems } = cartSlice.actions;

export default cartSlice.reducer;
