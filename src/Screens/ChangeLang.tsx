// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {BlockFooter, BlockHeader, f7, List, ListItem, Page} from "framework7-react";
import {useTranslation} from "react-i18next";

const ChangeLang = () => {
    const {i18n, t} = useTranslation();
    const [language, setLanguage] = useState(i18n.language)


    const handleMainBtn = () => {
        f7.views.main.router.navigate("/start")
    }
    const changeLang = (selectedLanguage) => {

        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    }
    useEffect(() => {
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = t('done');
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);

        window.Telegram.WebApp.BackButton.hide();

        return (() => {
            window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
        })

    }, [changeLang])
    return (
        <Page
        >
            <div style={{display: 'flex', flexDirection: 'column', height: '100vw', justifyContent: 'center'}}>
                <BlockHeader className='font-black' style={{fontSize: 20, lineHeight: 1.2, color: 'black'}}>Tilni tanlang / Выберите язык</BlockHeader>
                <List strongIos dividersIos mediaList  inset>
                    <ListItem
                        checked={language === "uz"}
                        radio
                        name="demo-media-radio"
                        value="uz"
                        title="O'zbekcha 🇺🇿"
                        text="UZ"
                        onChange={() => changeLang('uz')}
                    />
                    <ListItem
                        radio
                        checked={language === "ru"}
                        name="demo-media-radio"
                        value="ru"
                        title="Русский 🇷🇺"
                        text="RU"
                        onChange={() => changeLang('ru')}
                    />
                </List>
            </div>
        </Page>
    );
};

export default ChangeLang;