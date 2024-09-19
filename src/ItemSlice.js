import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "itemsManager",
  initialState: {
    cartItems: [],
  },
  reducers: {
    add: (state, payload) => {
      let tempIndex = state.cartItems.findIndex(
        (x) => x.id === payload.payload.id
      );
      if (tempIndex > -1) {
        state.cartItems[tempIndex].number += 1;
      } else {
        state.cartItems.push(payload.payload);
      }
    },
    remove: (state, payload) => {
      state.cartItems.splice(payload.payload, 1);
    },
    increase: (state, payload) => {
      state.cartItems[payload.payload].number += 1;
    },
    decrease: (state, payload) => {
      if (state.cartItems[payload.payload].number > 1) {
        state.cartItems[payload.payload].number -= 1;
      } else {
        state.cartItems.splice(payload.payload, 1);
      }
    },
    reset: (state) =>{
      state.cartItems = []
    }
  },
});

export const { increase, decrease, add, remove, reset } = itemSlice.actions;

export const selectCartItems = (state) => state.itemsManager.cartItems;

export default itemSlice.reducer;
