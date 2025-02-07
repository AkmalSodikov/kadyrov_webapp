// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';


const loadFromLocalStorage = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
        console.error('Could not load state from localStorage', e);
        return undefined;
    }
};

const saveToLocalStorage = (key, state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key, serializedState);
    } catch (e) {
        console.error('Could not save state to localStorage', e);
    }
};


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadFromLocalStorage('cart') || [],
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

export const cartMiddleware = (storeAPI) => (next) => (action) => {

    const result = next(action);
    if (action.type.startsWith('cart/')) {
        const state = storeAPI.getState().cart.items;
        saveToLocalStorage('cart', state);
    }
    return result;
};

export default cartSlice.reducer;
