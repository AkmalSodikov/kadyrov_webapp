// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useCallback, useEffect, useReducer} from 'react';
import {BlockFooter, BlockHeader, f7, List, ListInput, Page} from "framework7-react";
import {register} from "../api/api";
import {useTranslation} from "react-i18next";

const LegalRegister = () => {
    const {i18n, t} = useTranslation()


    const initialState = {
        name: JSON.parse(localStorage.getItem('register')).name || '',
        surname: JSON.parse(localStorage.getItem('register')).surname || '',
        lastName: JSON.parse(localStorage.getItem('register')).lastName || '',
        phoneNumber: JSON.parse(localStorage.getItem('register')).phoneNumber || '',
        inn: '',
        company: '',
        role: '',
        errors: {}
    };


    function formReducer(state, action) {
        switch (action.type) {
            case 'field':
                return {
                    ...state,
                    [action.fieldName]: action.payload,
                };
            case 'setErrors':
                return {
                    ...state,
                    errors: action.payload,
                };
            default:
                return state;
        }
    }

    const [state, localDispatch] = useReducer<any, any>(formReducer, initialState);

    const handleBackBtn = () => {
        f7.views.main.router.navigate("/register", {
            reloadAll: true,
        })
    }

    useEffect(() => {
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = t('continueBtn');;
        window.Telegram.WebApp.BackButton.hide();
    }, []);



    const handleChange = useCallback(
        (e) => {
            const {name, value} = e.target
            localDispatch({type: 'field', fieldName: name, payload: value})
        },
        [],
    );

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith('+998') || isNaN(Number(value))) {
            localDispatch({ type: 'field', fieldName: 'phoneNumber', payload: "+998" });
        } else {
            localDispatch({ type: 'field', fieldName: 'phoneNumber', payload: value });
        }
    };

    const validateForm = () => {
        const errors = {}
        if (!state.name.trim()) errors.name = t('enter_name');
        if (!state.surname.trim()) errors.surname = t('enter_surname');
        if (!state.lastName.trim()) errors.lastName = t('enter_last_name');
        if (!state.inn.trim()) errors.inn = t('enter_inn');
        if (!state.company.trim()) errors.company = t('enter_company');
        if (!state.role.trim()) errors.role =  t('position');
        if (Number.isNaN(Number(state.phoneNumber.slice(1))) || state.phoneNumber.length < 13) errors.phoneNumber = t('enter_phone_number');

        console.log(errors)
        localDispatch({type: 'setErrors', payload: errors});
        return Object.keys(errors).length === 0;
    }

    const handleMainBtn = () => {
        if (validateForm()) {
            window.Telegram.WebApp.MainButton.showProgress((leave = true) => {})
            window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
            const registerUser = async () => {
                const res = await register({
                    first_name: state.name,
                    second_name: state.surname,
                    last_name: state.lastName,
                    phone: state.phoneNumber,
                    telegram_chat_id: localStorage.getItem('chatID'),
                    is_legal_entity: true,
                    inn: state.inn,
                    company_name: state.company,
                    position: state.role,
                })
                console.log(res)
            }
            registerUser();

            f7.views.main.router.navigate('/wait_page', {
                reloadAll: true,
            });
            window.Telegram.WebApp.MainButton.hideProgress()
        }
    }
    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe.WebAppChat;
        console.log(initDataUnsafe)
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);

        return (() => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
        })
    }, [handleMainBtn])

    useEffect(() => {
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.onEvent('backButtonClicked', handleBackBtn);

    }, [])



    return (
        <Page onPageBeforeRemove={() => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
            window.Telegram.WebApp.MainButton.isVisible = false;
            window.Telegram.WebApp.BackButton.hide();
        }}>
            <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>{t('legal_entity_register')}</BlockHeader>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleChange}
                    errorMessageForce={state.errors.name}
                    errorMessage={state.errors.name}
                    placeholder={t('name')}
                />
                <ListInput
                    maxlength={15}
                    name="surname"
                    type="text"
                    value={state.surname}
                    onChange={handleChange}
                    errorMessageForce={state.errors.surname}
                    errorMessage={state.errors.surname}

                    placeholder={t('surname')}
                />
                <ListInput
                    maxlength={15}
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.lastName}
                    errorMessage={state.errors.lastName}
                    placeholder={t('last_name')}
                    value={state.lastName}
                />
            </List>
            <BlockFooter>{t('enter_full_name')}</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    errorMessageForce={state.errors.phoneNumber}
                    errorMessage={state.errors.phoneNumber}
                    name="phoneNumber"
                    type={"tel"}
                    inputmode={"numeric"}
                    placeholder="Номер телефона"
                    maxlength={13}
                    value={state.phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
            </List>
            <BlockFooter>{t('enter_phone_number')}</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="inn"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.inn}
                    errorMessage={state.errors.inn}
                    placeholder={t('inn')}
                />
            </List>
            <BlockFooter>{t('enter_inn')}</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="company"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.company}
                    errorMessage={state.errors.company}
                    placeholder={t('company')}
                />
            </List>
            <BlockFooter>{t('enter_company')}</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="role"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.role}
                    errorMessage={state.errors.role}
                    placeholder={t('pos')}
                />
            </List>
            <BlockFooter>{t('position')}</BlockFooter>
        </Page>
    );
};

export default LegalRegister;
