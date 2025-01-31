// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useCallback, useEffect, useReducer, useState} from 'react';
import {register} from "../api/api";
import {BlockFooter, BlockHeader, BlockTitle, f7, f7ready, List, ListInput, ListItem, Page} from "framework7-react";

const Register = () => {
    f7ready(() => {

    })


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

    const validateForm = () => {
        const errors = {}
        if (!state.name.trim()) errors.name = 'Введите имя';
        if (!state.surname.trim()) errors.surname = 'Введите фамилию';
        if (!state.lastName.trim()) errors.lastName = 'Введите отчество';
        if (Number.isNaN(Number(state.phoneNumber.slice(1))) || state.phoneNumber.length < 13) errors.phoneNumber = "Введите номер телефона";

        localDispatch({type: 'setErrors', payload: errors});
        return Object.keys(errors).length === 0;
    }

    const handleMainBtn = () => {
        console.log('ehere')
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
                    is_legal_entity: false,
                    /* "inn": "1211131131",
                     "company_name": "MadisonGroup",
                     "position": "CEO",
                     "telegram_chat_id": "your_telegram_chat_id"*/
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
        f7.views.main.router.navigate("/legal_register", {
            reloadAll: true,
        })

    }

    useEffect(() => {
        window.Telegram.WebApp.MainButton.color = "#1A8C03";
        window.Telegram.WebApp.MainButton.isVisible = true;
        window.Telegram.WebApp.MainButton.text = "ДАЛЬШЕ";
        window.Telegram.WebApp.BackButton.hide();
    }, []);


    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe.WebAppChat;
        console.log(initDataUnsafe)
        window.Telegram.WebApp.onEvent('mainButtonClicked', handleMainBtn);

        return (() => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
        })
    }, [handleMainBtn])











    return (
        <Page onPageBeforeRemove={() => {
                window.Telegram.WebApp.offEvent("mainButtonClicked", handleMainBtn)
            window.Telegram.WebApp.MainButton.isVisible = false;
        }
        }>
            <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>Регистрация</BlockHeader>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleChange}
                    errorMessageForce={state.errors.name}
                    errorMessage={state.errors.name}
                    placeholder="Имя"
                />
                <ListInput
                    maxlength={15}
                    name="surname"
                    type="text"
                    value={state.surname}
                    onChange={handleChange}
                    errorMessageForce={state.errors.surname}
                    errorMessage={state.errors.surname}

                    placeholder="Фамилия"
                />
                <ListInput
                    maxlength={15}
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.lastName}
                    errorMessage={state.errors.lastName}
                    placeholder="Отчество"
                />
            </List>

            <BlockFooter>Укажите ваше ФИО</BlockFooter>
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
            <BlockFooter>Укажите ваш номер телефона</BlockFooter>

            <div className='cursor-pointer' onClick={handleLegalButton}>
                <List strongIos dividersIos insetIos>
                    <ListItem className='delete-button' style={{display: 'flex', justifyContent: 'center', width: "100%"}}>
                        <label className='text-[#1A8C03]'>Юридическое лицо</label>
                    </ListItem>
                </List>
            </div>
        </Page>
    );
};

export default Register;
