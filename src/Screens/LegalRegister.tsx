// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useCallback, useEffect, useReducer} from 'react';
import {BlockFooter, BlockHeader, f7, List, ListInput, Page} from "framework7-react";
import {register} from "../api/api";

const LegalRegister = () => {

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
        window.Telegram.WebApp.MainButton.text = "ДАЛЬШЕ";
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
        if (!state.name.trim()) errors.name = 'Введите имя';
        if (!state.surname.trim()) errors.surname = 'Введите фамилию';
        if (!state.lastName.trim()) errors.lastName = 'Введите отчество';
        if (!state.inn.trim()) errors.inn = 'Введите ИНН';
        if (!state.company.trim()) errors.company = 'Введите компанию';
        if (!state.role.trim()) errors.role =  'Введите должность';
        if (Number.isNaN(Number(state.phoneNumber.slice(1))) || state.phoneNumber.length < 13) errors.phoneNumber = "Введите номер телефона";

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
            <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>Регистрация Юр. лица</BlockHeader>
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
                    value={state.lastName}
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
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="inn"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.inn}
                    errorMessage={state.errors.inn}
                    placeholder="ИНН"
                />
            </List>
            <BlockFooter>Ваш ИНН</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="company"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.company}
                    errorMessage={state.errors.company}
                    placeholder="Компания"
                />
            </List>
            <BlockFooter>Ваша компания</BlockFooter>
            <List strongIos dividersIos insetIos>
                <ListInput
                    maxlength={15}
                    name="role"
                    type="text"
                    onChange={handleChange}
                    errorMessageForce={state.errors.role}
                    errorMessage={state.errors.role}
                    placeholder="Должность"
                />
            </List>
            <BlockFooter>Ваша должность</BlockFooter>
        </Page>
    );
};

export default LegalRegister;
