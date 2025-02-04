// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useEffect} from 'react';
import {f7, Page, Preloader} from "framework7-react";
import {checkAuth} from "../api/api";

const InitPage = () => {
    useEffect(() => {
        const initData = window.Telegram.WebApp.initDataUnsafe;
        localStorage.setItem('chatID', initData?.user?.id);
        window.Telegram.WebApp.expand()
        const res = checkAuth(localStorage.getItem('chatID')).then((data) =>

            {


                if (data?.user?.status === 'pending') {
                    f7.views.main.router.navigate("/wait_page", {
                        reloadAll: true,
                    })
                } else if (data?.user?.status === 'approved') {
                    f7.views.main.router.navigate("/main_menu", {
                        reloadAll: true,
                    })
                } else if (data?.user?.status === 'rejected') {
                    f7.views.main.router.navigate("/start", {
                        reloadAll: true,
                    })
                } else {
                    f7.views.main.router.navigate("/start", {
                        reloadAll: true,
                    })
                }

        });

    }, [])
    return (
        <Page>
            <div className='flex items-center justify-center h-screen'>
                <Preloader color='#1A8C03'/>
            </div>
        </Page>
    );
};

export default InitPage;
