import React, {useEffect, useState} from 'react';
import {BlockFooter, BlockHeader, f7, List, ListItem, Page} from "framework7-react";
import {useTranslation} from "react-i18next";

const ChangeLang = () => {
    const {i18n, t} = useTranslation();
    const [language, setLanguage] = useState(i18n.language)
    const handleBackBtn = () => {
        f7.views.main.router.navigate("/startup")
    }
    const handleMainBtn = () => {
        f7.views.main.router.navigate("/startup")
    }
    const changeLang = (selectedLanguage) => {

        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    }
    useEffect(() => {
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = t('done');
        window.Telegram.WebApp.onEvent('backButtonClicked', handleBackBtn);
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);

        window.Telegram.WebApp.BackButton.show();

        return (() => {
            window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
            window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtn);
        })

    }, [changeLang])
    return (
        <Page
            onPageAfterOut={() => {
                window.Telegram.WebApp.BackButton.hide();
            }}
        >
            <div style={{display: 'flex', flexDirection: 'column', height: '100vw', justifyContent: 'center'}}>
                <BlockHeader >{t('interfaceLang')}</BlockHeader>
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