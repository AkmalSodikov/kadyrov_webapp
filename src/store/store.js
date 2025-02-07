// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {cartMiddleware} from './cartSlice';
import favouritesReducer, {favouritesMiddleware} from './favouritesSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        favourites: favouritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(favouritesMiddleware, cartMiddleware)

});

export default store;