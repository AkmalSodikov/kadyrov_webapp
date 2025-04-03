// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, Suspense } from 'react'
import './App.css'
import { App, View } from "framework7-react/esm/components";

// Динамические импорты для всех компонентов
const Start = React.lazy(() => import("./Screens/Start"));
const Register = React.lazy(() => import("./Screens/Register"));
const CardContent = React.lazy(() => import("./Screens/CardContent"));
const MainMenu = React.lazy(() => import("./Screens/MainMenu"));
const Korzina = React.lazy(() => import("./Screens/Korzina"));
const Favourites = React.lazy(() => import("./Screens/Favourites"));
const WaitPage = React.lazy(() => import("./Screens/WaitPage"));
const InitPage = React.lazy(() => import("./Screens/InitPage"));
const LegalRegister = React.lazy(() => import("./Screens/LegalRegister"));
const OrderPlaced = React.lazy(() => import("./Screens/OrderPlaced"));
const ChangeLang = React.lazy(() => import("./Screens/ChangeLang"));

// Компонент загрузки
const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="preloader"></div>
    </div>
);

function MyApp() {
    const f7params = {
        name: 'My App',
        colors: {
            primary: '#1A8C03',
        },
        routes: [
            {
                path: '/init_page',
                async: true,
                component: InitPage,
            },
            {
                path: '/start',
                async: true,
                component: Start,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/register',
                async: true,
                component: Register,
                options: {
                    clearPreviousHistory: true
                }
            },
            {
                path: '/legal_register',
                async: true,
                component: LegalRegister,
            },
            {
                path: '/main_menu',
                async: true,
                component: MainMenu,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/card_content',
                async: true,
                component: CardContent,
            },
            {
                path: '/favourites',
                async: true,
                component: Favourites,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/cart',
                async: true,
                component: Korzina,
                options: {
                    animate: false,
                    clearPreviousHistory: true
                }
            },
            {
                path: '/wait_page',
                async: true,
                component: WaitPage,
            },
            {
                path: '/order_placed',
                async: true,
                component: OrderPlaced,
            },
            {
                path: '/change_lang',
                async: true,
                component: ChangeLang,
                options: {
                    clearPreviousHistory: true
                }
            },
        ],
    };

    return (
        <App theme="ios" name="My App" {...f7params}>
            <Suspense fallback={<LoadingSpinner />}>
                <View transition='f7-fade' id="main-view" main url="/init_page" />
            </Suspense>
        </App>
    );
}

export default MyApp;

