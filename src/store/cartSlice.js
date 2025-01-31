// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { id, quantity, cost, dose, name, limit, totalCost } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.items.push({ id, quantity, cost, dose, name, limit, totalCost });
            }
        },
        removeItemFromCart: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
