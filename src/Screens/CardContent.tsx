// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useEffect, useState} from 'react';
import HeartButton from "../Components/HeartButton";
import {
    BlockFooter,
    BlockTitle,
    Button,
    f7,
    f7ready,
    Link,
    Page,
    PhotoBrowser,
    Preloader,
    Stepper
} from "framework7-react";
import img from '../assets/empty_img.jpg'
import MyStepper from "../Components/MyStepper";
import {useDispatch, useSelector} from "react-redux";
import { addItemToCart } from '../store/cartSlice.js';
import {getProductById} from "../api/api";
import {useTranslation} from "react-i18next";


const CardContent = (props) => {
    const {product, category} = props
    f7ready(() => {
    })


    const {i18n, t} = useTranslation()
    const favourites = useSelector((state) => state.favourites);
    const dispatch = useDispatch();


    const [curProduct, setCurProduct] = useState(null)
    const [variations, setVariations] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [steppers, setSteppers] = useState({
        1: 0, // Stepper for product 1
        2: 0, // Stepper for product 2
        3: 0, // Stepper for product 3
    });



    function handleBackBtn() {
        f7.views.main.router.navigate('/main_menu', {
            reloadAll: true,
        });
    }

    const increment = (id, quantity) => {
        setSteppers((prev) => ({
            ...prev,
            //[id]: prev[id] < quantity ?  prev[id] + 1 : prev[id],
            [id]: prev[id] + 1,
        }));
        window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid')
    };

    const decrement = (id) => {
        setSteppers((prev) => ({
            ...prev,
            [id]: prev[id] > 0 ? prev[id] - 1 : 0,
        }));
        window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid')
    };

    const handleAddToCart = () => {
        if (isActive) {
            if (curProduct.variations.length > 0) {
                curProduct.variations.forEach((product) => {
                    if (steppers[product.id] > 0) {
                        dispatch(
                            addItemToCart({
                                //limit: product.quantity,
                                image: curProduct?.images[0]?.detailUrl || null,
                                name: product.name,
                                id: product.id,
                                quantity: steppers[product.id],
                                cost: product.price,
                                dose: product.size,
                            })
                        );
                    }
                });
            } else {
                dispatch(
                    addItemToCart({
                        //limit: 1,
                        name: curProduct.name,
                        id: curProduct.id,
                        quantity: steppers[curProduct.id],
                        image: curProduct?.images[0]?.detailUrl || null,
                        cost: curProduct.price,
                        dose: curProduct.size,
                    })
                );
            }
            f7.views.main.router.navigate('/cart', {
                reloadAll: true,
                clearPreviousHistory: true
            });
        }
    };

    useEffect(() => {
        const fetchProductById = async () => {
            const res = await getProductById(product.ID);
            setCurProduct(res)


            if (res?.variations.length > 0) {
                const initialSteppers = res?.variations?.reduce((acc, variation) => {
                    acc[variation.id] = 0; // Set initial value as 0 for each variation ID
                    return acc;
                }, {});


                setSteppers(initialSteppers);
            } else {
                setSteppers({[res?.id]: 0})
            }

        }

        fetchProductById();
    }, [])

    useEffect(() => {
        console.log(steppers)
    }, [steppers]);




    useEffect(() => {
        window.Telegram.WebApp.BackButton.show()
        window.Telegram.WebApp.onEvent('backButtonClicked', handleBackBtn);

        return(() => {

            window.Telegram.WebApp.BackButton.hide()
            window.Telegram.WebApp.offEvent('backButtonClicked', handleBackBtn);
        });
    }, [])




    useEffect(() => {
        const hasActiveSteppers = Object.values(steppers).some((value) => value > 0);
        setIsActive(hasActiveSteppers);

    }, [steppers]);


    if (!curProduct || !curProduct?.variations) {
        return (
            <Page>
                <div className='flex items-center h-screen justify-center'>
                    <Preloader color='#1A8C03'/>
                </div>
            </Page>
        )
    }


    return (
            <Page>

                    <div>
                        <swiper-container style={{zIndex: 100,
                            "--swiper-pagination-color": "#1A8C03",    // active dot
                            "--swiper-pagination-bullet-inactive-color": "#1A8C03",
                            "--swiper-pagination-bullet-size": "10px",
                            "--swiper-pagination-bullet-active-scale": "1.2"
                        }} pagination className="demo-swiper-multiple" space-between="0">
                            {curProduct?.images.length > 0 ? curProduct?.images?.map(image => {

                                return (
                                <swiper-slide
                                >

                                    <div className="cards-ctn" style={{
                                        display: 'flex',
                                        height:400,
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        backgroundImage: `url(${image?.detailUrl.replace(/ /g, "%20")})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'bottom center',
                                    }}>
                                    </div>
                                </swiper-slide>
                            )}) :
                                <swiper-slide>
                                <div className="cards-ctn" style={{
                                display: 'flex',
                                height:400,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                backgroundImage: `url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom center',
                            }}>
                            </div>
                                    </swiper-slide>
                                }
                        </swiper-container>
                    </div>
                    <HeartButton combStyle={`z-[999999] absolute shadow-xl overflow-hidden right-2 top-2 w-[35px] h-[35px]`} car={product}  isFav={favourites?.some((fav) => fav.id === product.id)}/>

                    <div className='py-1' style={{ borderRadius: '0px 0px 15px 15px'}}>
                        <BlockTitle style={{marginTop: 15, fontSize: 20,lineHeight: 1.2, fontWeight: 'bold' }}>{curProduct?.name}</BlockTitle>
                        <p className='text-[17px] ml-4 mt-0 p-0'>{category}</p>
                        <BlockTitle className='items-center' style={{padding: 0,fontSize: 20, fontWeight: 'bold'}}>
                            {t('description')}
                        </BlockTitle>

                        <BlockFooter className='text-md' style={{
                            color: 'black',
                            overflow: 'visible',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            marginBottom: 0,
                        }}>{i18n.language === 'uz' ? (curProduct?.description_uz?.value ||  t('no_desc') ) : (curProduct?.description_ru?.value || t('no_desc'))}</BlockFooter>
                    </div>
                <div className='mt-4 mb-8'>
                    {curProduct?.variations.length > 0 ? curProduct.variations.map((item) => {
                        if (item.price) {
                            return (
                                <MyStepper
                                    key={item?.id}
                                    stepperValue={steppers[item.id]}
                                    onDecrement={() => decrement(item.id)}
                                    onIncrement={() => increment(item.id, item?.quantity)}
                                    cost={item.price}
                                    dose={item.size}
                                />
                            )
                        }
                    } ) : <MyStepper
                        key={curProduct?.id}
                        stepperValue={steppers[curProduct?.id]}
                        onDecrement={() => decrement(curProduct?.id)}
                        onIncrement={() => increment(curProduct?.id, curProduct?.quantity)}
                        cost={curProduct?.price}

                    />}
                </div>




                <div className='mb-36'></div>

                <div className='fixed bottom-0 w-full pb-4'  style={{

                    boxShadow: '0px 0px 30px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',borderRadius: '15px 15px 0px 0px' }}>
                    <p style={{marginLeft:12, marginRight: 12}} >
                        <Link onClick={() => handleAddToCart()} ignoreCache={ isActive ? false : true} className='w-full h-12 text-white'   style={{

                            backgroundColor: !isActive ? 'gray' : '#1A8C03',
                            fontWeight: 'bold',
                            borderRadius: 8,
                            textTransform: 'none',
                            fontSize: 15,

                        }} large fill>
                            <div className='mr-2'>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.2916 19.25C15.097 19.25 15.7499 18.5971 15.7499 17.7917C15.7499 16.9863 15.097 16.3333 14.2916 16.3333C13.4862 16.3333 12.8333 16.9863 12.8333 17.7917C12.8333 18.5971 13.4862 19.25 14.2916 19.25Z" fill="white"/>
                                    <path d="M7.62508 19.25C8.4305 19.25 9.08341 18.5971 9.08341 17.7917C9.08341 16.9863 8.4305 16.3333 7.62508 16.3333C6.81967 16.3333 6.16675 16.9863 6.16675 17.7917C6.16675 18.5971 6.81967 19.25 7.62508 19.25Z" fill="white"/>
                                    <path d="M4.78342 3.78332L4.61675 5.82499C4.58341 6.21666 4.89175 6.54166 5.28341 6.54166H18.0417C18.3917 6.54166 18.6834 6.27499 18.7084 5.92499C18.8167 4.44999 17.6917 3.24999 16.2167 3.24999H5.97508C5.89175 2.88332 5.72508 2.53332 5.46675 2.24166C5.05008 1.79999 4.46675 1.54166 3.86675 1.54166H2.41675C2.07508 1.54166 1.79175 1.82499 1.79175 2.16666C1.79175 2.50832 2.07508 2.79166 2.41675 2.79166H3.86675C4.12508 2.79166 4.36675 2.89999 4.54175 3.08332C4.71675 3.27499 4.80008 3.52499 4.78342 3.78332Z" fill="white"/>
                                    <path d="M17.8416 7.79166H5.0583C4.7083 7.79166 4.42496 8.05832 4.39163 8.39999L4.09163 12.025C3.97496 13.45 5.09163 14.6667 6.51663 14.6667H15.7833C17.0333 14.6667 18.1333 13.6417 18.225 12.3917L18.5 8.49999C18.5333 8.11666 18.2333 7.79166 17.8416 7.79166Z" fill="white"/>
                                </svg>
                            </div>

                            {t('add_to_cart')}
                        </Link>
                    </p>
                </div>
            </Page>
    )
};

export default CardContent;
