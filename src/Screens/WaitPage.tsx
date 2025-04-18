// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import  {useEffect} from 'react';
import {BlockHeader, Page} from "framework7-react";
import done_icon from '../assets/icons/done.svg'
import {checkAuth} from "../api/api.js";
import {useTranslation} from "react-i18next";

const WaitPage = () => {
    const {i18n, t} = useTranslation();
    return (
        <Page bgColor='white'>
            <div className='px-8 flex flex-col items-center justify-center text-center h-screen'>
                <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>{t('request_sent')}</BlockHeader>
                <img
                    className='w-[64]'
                    src={done_icon}
                />
                <p style={{whiteSpace: 'pre-line'}}>
                    {t('request_sent_p')}
                </p>
            </div>
        </Page>
    );
};

export default WaitPage;
