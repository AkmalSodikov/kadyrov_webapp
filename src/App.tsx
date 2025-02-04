// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react'
import './App.css'
import {App, f7, Link, Toolbar, View} from "framework7-react";
import Start from "./Screens/Start";
import Register from "./Screens/Register";
import CardContent from "./Screens/CardContent";
import MainMenu from "./Screens/MainMenu";
import Korzina from "./Screens/Korzina";
import eruda from "eruda";
import Favourites from "./Screens/Favourites";
import WaitPage from "./Screens/WaitPage";
import InitPage from "./Screens/InitPage";
import LegalRegister from "./Screens/LegalRegister";
import OrderPlaced from "./Screens/OrderPlaced";
import ChangeLang from "./Screens/ChangeLang";

eruda.init()

function MyApp() {

    const f7params = {
        name: 'My App',
        colors: {
            primary: '#1A8C03',
        },
        routes: [
            {
                path: '/init_page',
                component: InitPage,
            },
            {
                path: '/start',
                component: Start,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/register',
                component: Register,
                options: {
                    clearPreviousHistory: true
                }
            },
            {
                path: '/legal_register',
                component: LegalRegister,
            },
            {
                path: '/main_menu',
                component: MainMenu,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/card_content',
                component: CardContent,
            },
            {
                path: '/favourites',
                component: Favourites,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/cart',
                component: Korzina,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/wait_page',
                component:WaitPage,
            },
            {
                path: '/order_placed',
                component:OrderPlaced,
            },
            {
                path: '/change_lang',
                component:ChangeLang,
                options: {
                    clearPreviousHistory: true
                }
            },
        ],

    };
    return (
        <App theme="ios" name="My App" {...f7params}>
                <View transition='f7-fade' id="main-view" main url="/init_page" />
        </App>
    );
}

export default MyApp;

