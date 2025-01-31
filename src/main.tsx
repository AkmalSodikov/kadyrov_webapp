// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';
import 'framework7/css/bundle';
import {Provider} from "react-redux";
import store from '../src/store/store.js'
import './i18n';
// Init plugin
Framework7.use(Framework7React)

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
    <App />
    </Provider>
)
