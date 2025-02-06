// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {BlockHeader, f7, Page} from "framework7-react";
import done_icon from '../assets/icons/done.svg'
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {clearCart} from "../store/cartSlice";

const OrderPlaced = () => {
    const {i18n, t} = useTranslation();
    const dispatch = useDispatch();

    const handleMainBtn = () => {
        f7.views.main.router.navigate("/main_menu", {
            reloadAll: true,
        })
        dispatch(clearCart());
    }

    useEffect(() => {
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = t('go_back');
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);

        return (() => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
        })
    }, [])
    return (
        <Page bgColor='white'>
            <div className='flex flex-col items-center justify-center text-center h-screen'>
                <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>{t('order_placed')}</BlockHeader>
                <img
                    className='w-[64]'
                    src={done_icon}
                />
                <p style={{whiteSpace: 'pre-line'}}>
                    {t('order_placed_p')}
                </p>
            </div>
        </Page>
    );
};

export default OrderPlaced;