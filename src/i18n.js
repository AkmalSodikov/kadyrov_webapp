import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next)
    .init({
        fallbackLng: "uz",
        lng: "uz",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ru: {
                translation: {  // Missing translation namespace
                    hi: 'hird'
                }
            },
            uz: {
                translation: {  // Missing translation namespace
                    hi: 'roddd'
                }
            },
        }
    });

export default i18next;