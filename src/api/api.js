// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import axios from "axios";

const apiLink = 'https://api.kadyrovapp.uz/api';



export const getCatalogs = async () => {
    try {
        const res = await axios.get(`${apiLink}/catalogs`);
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProducts = async (id) => {
    try {
        const res = await axios.get(`${apiLink}/products/category/${id}`);
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const getProductById = async (id) => {
    try {
        const res = await axios.get(`${apiLink}/product/${id}`);
        console.log(res.data)
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const register = async (data) => {
    try {
        const res = await axios.post(`${apiLink}/register`, data);
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}


export const checkAuth = async (chat_id) => {
    try {
        const res = await axios.post(`${apiLink}/check-auth`, {chat_id: chat_id});
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const makeOrder = async (data) => {
    try {
        const res = await axios.post(`${apiLink}/place-order`, data);
        console.log(res)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const verifyExistingUser = async (phone) => {
    try {
        const res = await axios.post(`${apiLink}/verify-phone`, { 
            phone,
            telegram_chat_id: localStorage.getItem('chatID')
        });
        console.log('Ответ сервера:', res.data);
        
        if (res.data.status === 'approved') {
            return {
                status: res.data.status,
                user: res.data.user,
                token: res.data.token,
                message: res.data.message
            };
        }
        
        throw new Error(res.data.message || 'Неизвестная ошибка');
    } catch (e) {
        console.log('Ошибка запроса:', e.response?.data || e.message);
        if (e.response?.data?.errors) {
            console.log('Ошибки валидации:', e.response.data.errors);
        }
        throw e.response?.data || e;
    }
};






