// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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



const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: loadFromLocalStorage('favourites') || [],
    reducers: {
        addFavourite: (state, action) => {
            if (!state.some((item) => item.ID === action.payload.ID)) {
                state.push(action.payload);
                console.log(state)
            }
        },
        removeFavourite: (state, action) => {
            return state.filter((item) => item.ID !== action.payload.ID);
        },
    },
});



const { actions, reducer } = favouritesSlice;
export const { addFavourite, removeFavourite } = actions;

export const favouritesMiddleware = (storeAPI) => (next) => (action) => {
    const result = next(action);
    if (action.type.startsWith('favourites/')) {
        const state = storeAPI.getState().favourites;
        saveToLocalStorage('favourites', state);
    }
    return result;
};

export default favouritesSlice.reducer;