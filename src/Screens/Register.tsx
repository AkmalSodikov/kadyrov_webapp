// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useCallback, useEffect, useReducer, useState} from 'react';
import {register, verifyExistingUser} from "../api/api";
import {BlockFooter, BlockHeader, BlockTitle, f7, f7ready, List, ListInput, ListItem, Page} from "framework7-react";
import {useTranslation} from "react-i18next";

const Register = () => {
    f7ready(() => {

    })
    const {i18n, t} = useTranslation()


    const initialState = {
        name: '',
        surname: '',
        lastName: '',
        phoneNumber: '+998',
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

    const [showExistingUserModal, setShowExistingUserModal] = useState(false);

    const validateForm = () => {
        const errors = {}
        if (!state.name.trim()) errors.name = t('enter_name');
        if (!state.surname.trim()) errors.surname = t('enter_surname');
        if (!state.lastName.trim()) errors.lastName = t('enter_last_name');
        if (Number.isNaN(Number(state.phoneNumber.slice(1))) || state.phoneNumber.length < 13) errors.phoneNumber = t('enter_phone_number');

        localDispatch({type: 'setErrors', payload: errors});
        return Object.keys(errors).length === 0;
    }

    const handleMainBtn = async () => {
        if (showExistingUserModal) {
            // Логика для существующего пользователя
            try {
                if (validatePhone()) {
                    window.Telegram.WebApp.MainButton.showProgress();
                    const result = await verifyExistingUser(state.phoneNumber);
                    console.log('Результат верификации:', result);
                    
                    if (result && result.status === 'approved' && result.token) {
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('user', JSON.stringify(result.user));
                        window.Telegram.WebApp.MainButton.hideProgress();
                        
                        setTimeout(() => {
                            f7.views.main.router.navigate('/main_menu', {
                                reloadAll: true,
                                clearPreviousHistory: true
                            });
                        }, 100);
                    } else {
                        window.Telegram.WebApp.MainButton.hideProgress();
                        f7.dialog.alert(result?.message || t('user_not_found'));
                    }
                }
            } catch (error) {
                console.error('Ошибка при верификации:', error);
                window.Telegram.WebApp.MainButton.hideProgress();
                f7.dialog.alert(error?.message || t('user_not_found'));
            }
        } else {
            // Логика для новой регистрации
            if (validateForm()) {
                window.Telegram.WebApp.MainButton.showProgress();
                window.Telegram.WebApp.offEvent('mainButtonClicked', handleMainBtn);
                try {
                    const res = await register({
                        first_name: state.name,
                        second_name: state.surname,
                        last_name: state.lastName,
                        phone: state.phoneNumber,
                        telegram_chat_id: localStorage.getItem('chatID'),
                        is_legal_entity: false,
                    });
                    console.log(res);
                    f7.views.main.router.navigate('/wait_page', {
                        reloadAll: true,
                    });
                } catch (error) {
                    f7.dialog.alert(error.message || t('registration_error'));
                }
                window.Telegram.WebApp.MainButton.hideProgress();
            }
        }
    }

    const handleBackBtn = () => {
        setShowExistingUserModal(false);
    }

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


    const handleLegalButton = () => {
        localStorage.setItem('register', JSON.stringify(state));
        window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtn);
        f7.views.main.router.navigate("/legal_register", {
            reloadAll: true,
        })

    }

    const validatePhone = () => {
        if (Number.isNaN(Number(state.phoneNumber.slice(1))) || state.phoneNumber.length < 13) {
            localDispatch({
                type: 'setErrors',
                payload: { ...state.errors, phoneNumber: t('enter_phone_number') }
            });
            return false;
        }
        return true;
    };

    useEffect(() => {
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.BackButton.isVisible = showExistingUserModal;
        window.Telegram.WebApp.MainButton.text = showExistingUserModal ? t('verify') : t('continueBtn');
    }, [showExistingUserModal]);

    useEffect(() => {
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);
        if (showExistingUserModal) {
            window.Telegram.WebApp.onEvent('backButtonClicked', handleBackBtn);
        }
        return (() => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn);
            if (showExistingUserModal) {
                window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtn);
            }
        })
    }, [handleMainBtn, showExistingUserModal]);

    return (
        <Page onPageBeforeRemove={() => {
            window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtn);
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
            window.Telegram.WebApp.MainButton.isVisible = false;
        }}>
            <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>
                {showExistingUserModal ? t('Login') : t('register')}
            </BlockHeader>

            {!showExistingUserModal ? (
                <>
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

                    <div className='cursor-pointer' onClick={handleLegalButton}>
                        <List strongIos dividersIos insetIos>
                            <ListItem className='delete-button' style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                                <label className='text-[#1A8C03]'>{t('legal_entity')}</label>
                            </ListItem>
                        </List>
                    </div>

                    <div className='cursor-pointer mt-4' onClick={() => setShowExistingUserModal(true)}>
                        <List strongIos dividersIos insetIos>
                            <ListItem className='delete-button' style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                                <label className='text-[#1A8C03]'>{t('existing_user')}</label>
                            </ListItem>
                        </List>
                    </div>
                </>
            ) : (
                <>
                    <BlockTitle>{t('enter_phone_for_verification')}</BlockTitle>
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
                </>
            )}
        </Page>
    );
};

export default Register;
