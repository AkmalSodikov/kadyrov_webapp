// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useEffect, useState} from 'react';
import '../index.css'
import {
    Block,
    BlockTitle,
    f7,
    f7ready,
    Icon,
    Link,
    List,
    ListItem,
    Page,
    Popover,
    Preloader,
    Searchbar
} from "framework7-react";
import gaga from '../../public/112.jpg'
import home from '../assets/icons/home.svg'
import heart_gray from '../assets/icons/heart_gray.svg'
import korzina from '../assets/icons/korzina.svg'
import HeartButton from "../Components/HeartButton";
import {getCatalogs, getProductById, getProducts, register} from '../api/api.js'
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import image from '../assets/empty_img.jpg'

const MainMenu = () => {
    f7ready(() => {

    })
    const {i18n, t} = useTranslation();
    const vars = t('variations', { returnObjects: true });
    const [language, setLanguage] = useState(i18n.language)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([]);
    const favourites = useSelector((state) => state.favourites);
    const [img, setImg] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState({id: categories[0]?.id, name: i18n.language === 'ru' ? categories[0]?.name : vars[0]});
    const [products, setProducts] = useState([])
    const [isProductLoading, setIsProductLoading] = useState(false)



    const changeLang = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('lang', i18n.language)
    }

    useEffect(() => {
        window.Telegram.WebApp.MainButton.isVisible = false;
    }, [])

    useEffect(() => {
        const fetchCatalogs = async () => {
            let res = await getCatalogs();
            setCategories(res?.sections)
            setCategoryId({id: res?.sections[0]?.id, name:  i18n.language === 'ru' ? categories[0]?.name : vars[0]});
        }
        fetchCatalogs()
    }, [])

    useEffect(() => {

        const fetchProductsById = async () => {
            setIsProductLoading(true)
            let res = await getProducts(categoryId?.id);
            setProducts(res?.products)
            setIsProductLoading(false)
        }
        if (categoryId?.id) {
            fetchProductsById()
        }
    }, [categoryId])






    useEffect(() => {
        const filteredProducts = products?.filter((item) =>
            item?.NAME.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filteredProducts)
    }, [products, searchQuery])


    return (
        <Page>
                <div style={{marginTop: 15}} className="custom-searchbar-container">
                    <div className="searchbar-wrapper">
                        <Searchbar
                            style={{
                                backgroundColor: 'transparent',
                                borderRadius: 10,
                                '--f7-searchbar-search-icon-color': '#1A8C03'
                            }}
                            className="custom-searchbar"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            searchContainer=".search-list"
                            searchIn=".item-title"
                            outline={false}
                            clearButton={false}
                            disableButton={false}
                            customSearch={true}
                        />
                    </div>
                    <Link popoverOpen=".language-popover">
                        <div className="right-icons">
                            <span className="flag-icon">{language === 'uz' ? '🇺🇿' : '🇷🇺'}</span>
                        </div>
                    </Link>
                    <Popover arrow  className="language-popover">
                        <h1 className="pl-4 pt-1 font-bold">{t('interfaceLang')}</h1>
                        <List inset dividersIos>
                            <ListItem onChange={() => changeLang('ru')} checked={language === "ru"}  radio radioIcon="end" title="Русский 🇷🇺" value="ru" name="demo-radio-end" />
                            <ListItem onChange={() => changeLang('uz')} checked={language === "uz"} radio radioIcon="end" title="O'zbekcha 🇺🇿" value="uz" name="demo-radio-end" />
                        </List>
                    </Popover>
            </div>

            <div style={{
                scrollbarWidth: 'none',
            }} className="tabbar mt-4 w-full overflow-x-scroll">
                <div className="flex justify-center items-center p-1 w-max  font-bold">

                    {categories.map((tab, index) => {
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {setActiveTab(index); setCategoryId({id: tab.id, name: i18n.language === 'ru' ? tab.name : vars[index]});}}
                                    className={`
                          
              px-2 py-1.5   mx-1 rounded-md text-[13px] whitespace-nowrap transition-all
              ${activeTab === index
                                        ? 'bg-[#1A8C03] text-white'
                                        : ' text-[#1A8C03] bg-[#E0E0E6]'}
            `}
                                >
                                    {i18n.language === 'ru' ? tab.name : vars[index]}
                                    <div className='w-4'></div>
                                </button>
                            )}) }

                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className='w-full mx-4 border border-color-primary mt-4 aspect-[232/2] rounded-md bg-color-primary'></div>
            </div>

            <Block style={{marginTop: '20px'}} className={`${(products?.length === 0 || isProductLoading) ? 'flex items-center justify-center' : 'grid grid-cols-2 gap-y-2.5 gap-x-2.5 p-0'}`}>
                {(products?.length === 0 || isProductLoading)  ? <Preloader color='#1A8C03'/> : (filteredProducts.length === 0 ? <div>{t('nothing_found')}</div> : filteredProducts?.map((product, index) => {
                    let isLastItem = (index === products?.length - 1)
                    return (
                    <div key={index}>

                        <div
                            /*ref={isLastCar ? lastCarRef : null}*/
                            onClick={() => {f7.views.main.router.navigate(`/card_content`, {props: {product: product, category: categoryId.name}})}}
                            className=" relative bg-color-white rounded-xl flex-grow w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-0 m-0"
                        >

                            <HeartButton combStyle='absolute shadow overflow-hidden top-1 right-1' car={{...product, category: categoryId.name}} isFav={favourites?.some((fav) => fav.ID === product.ID)}/>
                            <div
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom center',
                                    height: 150,
                                    backgroundImage: `url(${(product?.images?.length > 0 ? product?.images[0]?.detailUrl.replace(/ /g, "%20") : image)})`,
                                }}
                                className=" rounded-t-xl w-full"
                            >
                            </div>
                            <p className="text-[14px] pl-2 mt-2 font-bold overflow-hidden whitespace-nowrap text-ellipsis">{product?.NAME}</p>
                            <p className="pl-2 -mt-2 whitespace-normal text-[12px]">{categoryId.name}</p>

                            <div className='mt-8 relative flex'>
                                <p className='pl-2 text-[9px] text-gray-500'>{' '}</p>
                                <p className='absolute bottom-[-6px] text-[14px] font-bold right-1'>{Number.parseInt(product?.PRICE).toLocaleString('en-US').replace(/,/g, ' ')} {product?.CURRENCY_ID}</p>
                            </div>

                        </div>
                        {isLastItem && (<div className='mb-16'></div>)}
                    </div>
                )}))}
            </Block>

            <div style={{position: 'fixed', paddingBottom:80, '--f7-tabbar-link-active-color': 'green'}} className="toolbar tabbar-icons toolbar-bottom">
                <div style={{marginBottom: 0}} className="toolbar-inner">
                    <Link tabLinkActive tabLink="#tab-1" >
                        <img src={home}/>
                        <span className="tabbar-label">{t('main_menu')}</span>
                    </Link>
                    <Link onClick={() => {f7.views.main.router.navigate("/cart")}} tabLink="#tab-2">
                        <img src={korzina}/>
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

export default MainMenu;
