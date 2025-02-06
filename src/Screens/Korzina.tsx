// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import  {useEffect, useState} from 'react';
import {
    BlockHeader,
    BlockTitle,
    Button,
    f7,
    f7ready,
    Icon,
    Link,
    List,
    ListItem,
    Page,
    Preloader
} from "framework7-react";
import img from "../assets/img.png";
import heart_gray from "../assets/icons/heart_gray.svg";
import home_inactive from "../assets/icons/home_inactive.svg";
import cart_active from '../assets/icons/cart_active.svg'
import cart from '../assets/icons/cart.svg'
import tick from '../assets/icons/tick.svg'
import {useDispatch, useSelector} from "react-redux";
import CartStepper from "../Components/CartStepper";
import {makeOrder} from "../api/api";
import {addItemToCart, removeItemFromCart} from "../store/cartSlice";
import {useTranslation} from "react-i18next";

const Korzina = () => {
    f7ready(() => {
    })
    const {i18n, t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items)
    const totCost = useSelector((state) => state.cart.totCost)
    const [totalCost, setTotalCost] = useState(0);
    const [quantities, setQuantities] = useState({});
    console.log(totalCost)
    useEffect(() => {
        const totalCost2 = items.reduce((total, item) => {
            return total + (item.cost * item.quantity); // Multiply cost by quantity for each item
        }, 0);
        setTotalCost(totalCost2)
    }, [quantities])

    const updateQuantity = (productId, quantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: quantity
        }));
        // Calculate the total cost of all items in the cart
        const totalCost2 = items.reduce((total, item) => {
            return total + (item.cost * item.quantity); // Multiply cost by quantity for each item
        }, 0);
        setTotalCost(totalCost2)
        if (quantity === 0) {
            dispatch(removeItemFromCart({id: productId}))
            return;
        }
        dispatch(
            addItemToCart({
                name: items.find((item) => item.id === productId).name,
                id: productId,
                quantity: quantity || 0,
                cost:  items.find((item) => item.id === productId).price,
                dose:  items.find((item) => item.id === productId).size,
                limit: items.find((item) => item.id === productId).limit,
                totalCost: totalCost2,
            })
        );

    };

    const placeOrder = async () => {
        const newItems = items.map((item) => (

            { id: item.id,
                    name: item.name,
                    price: item.cost,
                    quantity: item.quantity,}

    ))
        const order = {
            chat_id: localStorage.getItem('chatID'),
            cart: newItems,
            total_amount: `${totalCost}`,
        }

        const res = await makeOrder(order);

        if (res.message) {
            f7.views.main.router.navigate('/order_placed', {
                reloadAll: true,
            });
        }
        console.log(res)
    }


    const removeItem = (productId) => {
        setIsLoading(true);
        dispatch(removeItemFromCart({id: productId}));
    }

    useEffect(() => {
        const totalCost2 = items.reduce((total, item) => {
            return total + (item.cost * item.quantity);
        }, 0);
        setTotalCost(totalCost2);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [items]);

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Preloader color='#1A8C03'/>
            </div>
        )
    }







    return (
        <Page>
            <BlockHeader className='font-black ' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>{t('cart')}</BlockHeader>
            <div className="-mt-8 m-0 flex flex-col h-full">
            <List dividersIos mediaList insetIos strongIos>
            {items.map((item, index) => {
                let isLastItem = (index === items?.length - 1)
                return (
                    <ListItem className={`${isLastItem && 'mb-64'} mt-2`} title={item.name } subtitle={item.dose || item.name}>
                        <img
                            slot="media"
                            style={{ borderRadius: '8px' }}
                            src={item.image}
                            width="44"
                        />
                        <div onClick={() => removeItem(item.id)} slot='after'>
                            <Icon f7="trash" size="25px" style={{color: "red"}}></Icon>
                        </div>

                        <div className='max-[330px]:flex-col gap-1 flex flex-row items-center justify-between m-0 mt-4'>
                            <p className='whitespace-nowrap font-bold m-0 text-md'>{parseInt(item.cost).toLocaleString('fr-FR')} <span className='text-[12px]'>UZS</span></p>
                            <CartStepper
                                key={item.id}
                                productId={item.id}
                                initialQuantity={item.quantity}
                                onQuantityChange={updateQuantity}
                                limit={item.limit}
                            />
                        </div>
                    </ListItem>
                )})}
            </List>
                <div className='mb-64'></div>
            </div>



            <div className={`${items?.length === 0 || totalCost === 0 ? 'hidden' : ''} jump-button fixed bottom-16 w-full pb-4 z-[100]`}  style={{
                boxShadow: '0px 0px 30px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',borderRadius: '15px 15px 0px 0px' }}>
                <p style={{marginLeft:12, marginRight: 12}} >
                    <p className='flex justify-between font-bold text-lg' style={{marginLeft:12, marginRight: 12}} >
                        {t('total_sum')}: <span>{parseInt(totalCost).toLocaleString('fr-FE')} UZS</span>
                    </p>
                    <Link onClick={placeOrder} className='w-full h-12 text-white'   style={{

                        backgroundColor: '#1A8C03',
                        fontWeight: 'bold',
                        borderRadius: 8,
                        textTransform: 'none',
                        fontSize: 15,

                    }} large fill>
                        <div className='mr-2'>
                            <img
                                src={tick}
                            />
                        </div>

                        {t('make_order')}
                    </Link>
                </p>
            </div>

            <div style={{position: 'fixed', paddingBottom:80, '--f7-tabbar-link-active-color': 'green'}} className="toolbar tabbar-icons toolbar-bottom">
                <div style={{marginBottom: 0}} className="toolbar-inner">
                    <Link onClick={() => {f7.views.main.router.navigate("/main_menu")}} tabLink="#tab-1" >
                        <img src={home_inactive}/>
                        <span className="tabbar-label">{t('main_menu')}</span>
                    </Link>
                    <Link tabLinkActive  tabLink="#tab-2">
                        <img src={cart_active}/>
                        <span className="tabbar-label">{t('cart')}</span>
                    </Link>
                    <Link onClick={() => {f7.views.main.router.navigate("/favourites");}}   tabLink="#tab-3">
                        <img src={heart_gray}/>
                        <span className="tabbar-label">{t('favs')}</span>
                    </Link>
                </div>
            </div>
        </Page>
    );
};

export default Korzina;
