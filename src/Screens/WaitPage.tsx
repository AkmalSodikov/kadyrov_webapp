// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import  {useEffect} from 'react';
import {BlockHeader, Page} from "framework7-react";
import done_icon from '../assets/icons/done.svg'
import {checkAuth} from "../api/api.js";

const WaitPage = () => {
    return (
        <Page bgColor='white'>
            <div className='flex flex-col items-center justify-center text-center h-screen'>
                <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>Запрос отправлен!</BlockHeader>
                <img
                    className='w-[64]'
                    src={done_icon}
                />
                <p style={{whiteSpace: 'pre-line'}}>
                    {`Ваш запрос на обработку данных отправлен. \n После прохождения модерации вы получите уведомление, и маркетплейс станет доступен.`}
                </p>
            </div>
        </Page>
    );
};

export default WaitPage;
