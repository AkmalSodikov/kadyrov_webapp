// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import  {useEffect, useState} from 'react';
import {BlockHeader, BlockTitle, Button, f7, f7ready, Link, List, ListItem, Page} from "framework7-react";
import img from "../assets/img.png";
import heart_gray from "../assets/icons/heart_gray.svg";
import home_inactive from "../assets/icons/home_inactive.svg";
import cart_active from '../assets/icons/cart_active.svg'
import cart from '../assets/icons/cart.svg'
import tick from '../assets/icons/tick.svg'
import {useDispatch, useSelector} from "react-redux";
import CartStepper from "../Components/CartStepper";
import {makeOrder} from "../api/api";
import {addItemToCart} from "../store/cartSlice";

const Korzina = () => {
    f7ready(() => {
    })

    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items)
    const [totalCost, setTotalCost] = useState(0);
    const [quantities, setQuantities] = useState({});

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
            total_amount: totalCost,
        }

        const res = await makeOrder(order);

        if (res.message) {
            f7.views.main.router.navigate('/order_placed', {
                reloadAll: true,
            });
        }
        console.log(res)
    }








    return (
        <Page>
            <BlockHeader className='font-black ' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>Корзина</BlockHeader>
            <div className="-mt-8 m-0 flex flex-col h-full">
            <List dividersIos mediaList insetIos strongIos>
            {items.map((item, index) => {
                let isLastItem = (index === items?.length - 1)
                return (
                    <ListItem className={`${isLastItem && 'mb-64'} mt-2`} title={item.name } subtitle={item.dose}>
                        <img
                            slot="media"
                            style={{
                                borderRadius: '8px',
                                objectFit: 'cover'
                            }}
                            src={img}
                            width="90"
                            height="90"
                        />
                        <div slot='after'>
                            <img
                                src={cart}
                            />
                        </div>

                        <div className='max-[330px]:flex-col gap-1 flex flex-row items-center justify-between'>
                            <p className='whitespace-nowrap font-bold text-sm'>{item.cost} UZS</p>
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
                        Общая сумма: <span>{totalCost} UZS</span>
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

                        Оформить заказ
                    </Link>
                </p>
            </div>

            <div style={{position: 'fixed', paddingBottom:80, '--f7-tabbar-link-active-color': 'green'}} className="toolbar tabbar-icons toolbar-bottom">
                <div style={{marginBottom: 0}} className="toolbar-inner">
                    <Link onClick={() => {f7.views.main.router.navigate("/main_menu")}} tabLink="#tab-1" >
                        <img src={home_inactive}/>
                        <span className="tabbar-label">Главная</span>
                    </Link>
                    <Link tabLinkActive  tabLink="#tab-2">
                        <img src={cart_active}/>
                        <span className="tabbar-label">Корзина</span>
                    </Link>
                    <Link onClick={() => {f7.views.main.router.navigate("/favourites");}}   tabLink="#tab-3">
                        <img src={heart_gray}/>
                        <span className="tabbar-label">Избранное</span>
                    </Link>
                </div>
            </div>
        </Page>
    );
};

export default Korzina;
