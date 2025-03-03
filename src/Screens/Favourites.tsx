// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Block, BlockHeader, f7, Link, Page, Preloader} from "framework7-react";
import React from "react";
import img from "../assets/img.png";
import home from "../assets/icons/home.svg";
import korzina from "../assets/icons/korzina.svg";
import heart_active from "../assets/icons/heart_active.svg";
import home_inactive from "../assets/icons/home_inactive.svg";
import {useSelector} from "react-redux";
import HeartButton from "../Components/HeartButton";
import {useTranslation} from "react-i18next";

const Favourites = () => {
    const {i18n, t} = useTranslation();
    const favourites = useSelector((state) => state.favourites);
    console.log(favourites)


    return (
        <Page>

            <BlockHeader className='font-black' style={{fontSize: 25, lineHeight: 1.2, color: 'black'}}>{t('favs')}</BlockHeader>
            <Block style={{marginTop: '20px'}} className={`grid grid-cols-2 gap-y-2.5 gap-x-2.5 p-0`}>
                {favourites.map((product, index) => {
                    let isLastItem = (index === favourites.length - 1)
                    console.log(product)
                    return (
                        <div>

                            <div
                                /*ref={isLastCar ? lastCarRef : null}*/
                                key={index}
                                onClick={() => {f7.views.main.router.navigate(`/card_content`, {props: {product: product}})}}
                                className=" relative bg-color-white rounded-xl flex-grow w-full sm:w-1/3 md:w-1/6 lg:w-1/4 xl:w-1/5 p-0 m-0"
                            >

                                <HeartButton combStyle='absolute shadow overflow-hidden top-1 right-1' car={product} isFav={favourites?.some((fav) => fav.ID === product.ID)}/>
                                <div
                                    style={{
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'bottom center',
                                        height: 150,
                                        backgroundImage: `url(${product?.images && product?.images[0]?.detailUrl})`,
                                    }}
                                    className="rounded-t-xl w-full"
                                >
                                </div>
                                <p className="text-[14px] pl-2 mt-2 font-bold overflow-hidden whitespace-nowrap text-ellipsis">{product.NAME}</p>
                                <p className="pl-2 -mt-2 whitespace-normal text-[12px] overflow-hidden whitespace-nowrap text-ellipsis">{product.category}</p>

                                <div className='mt-8 relative flex'>
                                    <p className='pl-2 text-[9px] text-gray-500'>{' '}</p>
                                    <p className='absolute bottom-[-6px] text-[14px] font-bold right-1'>{Number.parseInt(product?.PRICE).toLocaleString('en-US').replace(/,/g, ' ')} UZS</p>
                                </div>

                            </div>
                            {isLastItem && (<div className='mb-16'></div>)}
                        </div>
                    )})}
            </Block>
            <div style={{position: 'fixed', paddingBottom:80, '--f7-tabbar-link-active-color': 'green'}} className="toolbar tabbar-icons toolbar-bottom">
                <div style={{marginBottom: 0}} className="toolbar-inner">
                    <Link onClick={() => {f7.views.main.router.navigate("/main_menu")}} tabLink="#tab-1" >
                        <img src={home_inactive}/>
                        <span className="tabbar-label">{t('main_menu')}</span>
                    </Link>
                    <Link onClick={() => {f7.views.main.router.navigate("/cart")}} tabLink="#tab-2">
                        <img src={korzina}/>
                        <span className="tabbar-label">{t('cart')}</span>
                    </Link>
                    <Link tabLinkActive tabLink="#tab-3">
                        <img src={heart_active}/>
                        <span className="tabbar-label">{t('favs')}</span>
                    </Link>
                </div>
            </div>
        </Page>
    );
};

export default Favourites;
