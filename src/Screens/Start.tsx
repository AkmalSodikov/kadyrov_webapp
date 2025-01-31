// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import  {useEffect} from 'react';
import {
    BlockHeader,
    BlockTitle,
    Button,
    f7,
    f7ready,
    List,
    ListInput,
    ListItem,
    Page,
    Preloader
} from "framework7-react";
import {init} from "framework7/modules/component/snabbdom/snabbdom";
import {useTranslation} from "react-i18next";

const Start = () => {
    f7ready(() => {

    })
    const { i18n, t } = useTranslation();

    const handleMainBtn = () => {
        const initData = Telegram.WebApp.initDataUnsafe;
        console.log(initData);
        window.Telegram.WebApp.MainButton.showProgress((leave = true) => {})
        window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
        f7.views.main.router.navigate('/register');
        window.Telegram.WebApp.MainButton.hideProgress()
    }
    useEffect(() => {
        const initData = Telegram.WebApp.initDataUnsafe;
        localStorage.setItem('chatID', initData?.user?.id);
    }, []);


    useEffect( () => {
        window.Telegram.WebApp.MainButton.text = "ПРОДОЛЖИТЬ";
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);
        window.Telegram.WebApp.BackButton.hide();

        return (() => {
            window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
        })
    }, []);


    return (
        <Page  >

            <div className='flex flex-col items-center justify-center h-screen'>


            <p className='text-center font-black' style={{margin: 0, fontSize: 30, lineHeight: 1.1}}>Добро пожаловать!</p>
            <p className='text-center px-4 pb-8'>Наш маркетплейс — ваш надежный помощник в мире медицинских товаров.</p>
            <div>


            <div className="px-4 ">
                {/* Feature Item */}
                <div className="flex items-center space-x-3">
                    <div className="text-green-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                  d="M5.7401 16C5.8501 15.51 5.6501 14.81 5.3001 14.46L2.8701 12.03C2.1101 11.27 1.8101 10.46 2.0301 9.76C2.2601 9.06 2.9701 8.58 4.0301 8.4L7.1501 7.88C7.6001 7.8 8.1501 7.4 8.3601 6.99L10.0801 3.54C10.5801 2.55 11.2601 2 12.0001 2C12.7401 2 13.4201 2.55 13.9201 3.54L15.6401 6.99C15.7701 7.25 16.0401 7.5 16.3301 7.67L5.5601 18.44C5.4201 18.58 5.1801 18.45 5.2201 18.25L5.7401 16Z"
                                  fill="#1A8C03"/>
                            <path
                                d="M18.7 14.46C18.34 14.82 18.14 15.51 18.26 16L18.95 19.01C19.24 20.26 19.06 21.2 18.44 21.65C18.19 21.83 17.89 21.92 17.54 21.92C17.03 21.92 16.43 21.73 15.77 21.34L12.84 19.6C12.38 19.33 11.62 19.33 11.16 19.6L8.23005 21.34C7.12005 21.99 6.17005 22.1 5.56005 21.65C5.33005 21.48 5.16005 21.25 5.05005 20.95L17.21 8.79C17.67 8.33 18.32 8.12 18.95 8.23L19.96 8.4C21.02 8.58 21.73 9.06 21.96 9.76C22.18 10.46 21.88 11.27 21.12 12.03L18.7 14.46Z"
                                fill="#1A8C03"/>
                        </svg>

                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Удобный интерфейс</h2>
                        <p className='mt-1'>
                            Удобный интерфейс нашего маркетплейса делает поиск медицинских
                            товаров быстрым и простым, как никогда!
                        </p>
                    </div>
                </div>
            </div>
            <div className=" px-4 mt-4">
                {/* Feature Item */}
                <div className="flex items-center space-x-3">
                    <div className="text-green-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                  d="M16.4901 22H7.51008C4.00008 22 3.24009 19.99 3.53009 17.53L4.43008 10.03C4.66008 8.09 5.00008 6.5 8.40008 6.5H15.6001C19.0001 6.5 19.3401 8.09 19.5701 10.03L20.3201 16.28L20.4701 17.53C20.4801 17.61 20.4901 17.69 20.5001 17.77C20.7101 20.12 19.8901 22 16.4901 22Z"
                                  fill="#1A8C03"/>
                            <path
                                d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z"
                                fill="#1A8C03"/>
                            <path
                                d="M20.5 17.77C20.47 17.78 20.44 17.78 20.41 17.78H8C7.59 17.78 7.25 17.44 7.25 17.03C7.25 16.61 7.59 16.28 8 16.28H20.32L20.47 17.53C20.48 17.61 20.49 17.69 20.5 17.77Z"
                                fill="#1A8C03"/>
                        </svg>


                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Большой выбор</h2>
                        <p className='mt-1'>
                            Большой ассортимент медицинских товаров на нашем маркетплейсе
                        </p>
                    </div>
                </div>
            </div>
            <div className="space-y-6 px-4 mt-4">
                {/* Feature Item */}
                <div className="flex items-center space-x-3">
                    <div className="text-green-500">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4"
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  fill="#1A8C03"/>
                            <path
                                d="M10.5799 15.58C10.3799 15.58 10.1899 15.5 10.0499 15.36L7.21994 12.53C6.92994 12.24 6.92994 11.76 7.21994 11.47C7.50994 11.18 7.98994 11.18 8.27994 11.47L10.5799 13.77L15.7199 8.63C16.0099 8.34 16.4899 8.34 16.7799 8.63C17.0699 8.92 17.0699 9.4 16.7799 9.69L11.1099 15.36C10.9699 15.5 10.7799 15.58 10.5799 15.58Z"
                                fill="#1A8C03"/>
                        </svg>


                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Быстрое оформление</h2>
                        <p className='mt-1'>
                            Оформляйте заказы быстро и легко — на нашем маркетплейсе всё сделано для вашего удобства!
                        </p>
                    </div>
                </div>
            </div>
            </div>
                <Button onClick={() => f7.views.main.router.navigate('/change_lang', {
                    reloadAll: true,
                })} large style={{width: '80%',  margin: '20px auto'}}>ВЫБРАТЬ ЯЗЫК</Button>
            </div>

        </Page>
    );
};

export default Start;
