// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totCost: 0,
    },
    reducers: {
        addItemToCart: (state, action) => {
            const { id, quantity, image, cost, dose, name, limit} = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity = quantity;
            } else {
                state.items.push({ id, quantity, cost, dose, name, limit, image});
            }
        },
        updateTotalCost: (state, action) => {
            const {cost} = action.payload
            state.totCost = cost;
        },
        removeItemFromCart: (state, action) => {
            const { id } = action.payload;
            console.log('Before remove:', state.items);
            state.items = state.items.filter((item) => item.id !== id);
            console.log('After remove:', state.items);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, updateTotalCost } = cartSlice.actions;

export default cartSlice.reducer;
