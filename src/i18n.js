import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next)
    .init({
        fallbackLng: "uz",
        lng: "uz",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ru: {
                translation: {
                    //start:
                    description: 'Описание',
                    no_desc: 'Не указано',
                    go_back: 'Назад в главное меню',
                    nothing_found: 'Ничего не найдено',
                    welcome: 'Добро пожаловать!',
                    welcome_p: 'Наш маркетплейс — ваш надежный помощник в мире медицинских товаров',
                    comf_interface: 'Удобный интерфейс',
                    comf_interface_p: 'Удобный интерфейс нашего маркетплейса делает поиск медицинских товаров быстрым и простым, как никогда',
                    large_choice: 'Большой выбор',
                    large_choice_p: 'Большой ассортимент медицинских товаров на нашем маркетплейсе',
                    quick_order: 'Быстрое оформление',
                    quick_order_p: ' Оформляйте заказы быстро и легко — на нашем маркетплейсе всё сделано для вашего удобства',
                    choose_lang: 'ВЫБРАТЬ ЯЗЫК',
                    continueBtn: 'ПРОДОЛЖИТЬ',
                    // change lang:
                    interfaceLang: 'Выберите язык',
                    done: 'Готово',
                    // register
                    register: 'Регистрация',
                    name: 'Имя',
                    enter_name: 'Введите имя',
                    enter_surname: 'Введите фамилию',
                    enter_last_name: 'Введите отчество',
                    surname: 'Фамилия',
                    last_name:'Отчество',
                    enter_full_name: 'Укажите ваше ФИО',
                    enter_phone_number: 'Укажите ваш номер телефона',
                    legal_entity: 'Юридическое лицо',
                    legal_entity_register: 'Регистрация Юр. лица',
                    inn: "ИНН",
                    enter_inn: 'Укажите ИНН вашей компании',
                    company: 'Компания',
                    pos: 'Должность',
                    enter_company: 'Укажите название вашей компании',
                    position: 'Укажите должность в вашей компании',
                    // wait page
                    request_sent: 'Запрос отправлен!',
                    request_sent_p: 'Ваш запрос на обработку данных отправлен. \n После прохождения модерации вы получите уведомление, и маркетплейс станет доступен.',
                    //main_menu
                    search: 'Поиск',
                    main_menu: 'Главная',
                    cart: 'Корзина',
                    favs: 'Избранное',
                    add_to_cart: 'Добавить в корзину',
                    total_sum: 'Общая сумма',
                    make_order: 'Оформить заказ',
                    order_placed: 'Заказ оформлен!',
                    order_placed_p: 'Ваш заказ принят! \n Мы скоро с вами свяжемся.',
                    existing_user: 'Я уже клиент',
                    enter_phone_for_verification: 'Введите номер телефона для проверки',
                    verify: 'Проверить',
                    back: 'Назад',
                    user_not_found: 'Пользователь не найден в системе',
                }
            },
            uz: {
                translation: {
                    //start:
                    description: "Batafsil ma'lumot",
                    no_desc: 'Ma\'lumot yoq',
                    go_back: 'Asosiy menuga qaytish',
                    nothing_found: 'Hechnarsa topilmadi',
                    welcome: 'Xush kelibsiz!',
                    welcome_p: 'Bizning marketplace — tibbiy mahsulotlar dunyosidagi ishonchli yordamchingiz',
                    comf_interface: 'Qulay va oson interfeys',
                    comf_interface_p: 'Bizning marketplace'ning qulay interfeysi bilan tibbiy mahsulot topish bunchalik tez va oson bo'lmagan',
                    large_choice: 'Katta tanlov',
                    large_choice_p: 'Bizning marketplace'da tibbiy mahsulotlarning ulkan tanlovi',
                    quick_order: 'Tez buyurtma',
                    quick_order_p: 'Buyurtma berish tez va oson! Bizning marketplace sizning qulayligingiz uchun yaratilgan',
                    choose_lang: 'TILNI TANLANG',
                    continueBtn: 'DAVOM ETISH',
// change lang:
                    interfaceLang: 'Tilni tanlang',
                    done: 'Bajarildi',
// register
                    register: 'Ro'yxatdan o'tish',
                    name: 'Ism',
                    enter_name: 'Ismingizni kiriting',
                    enter_surname: 'Familiyangizni kiriting',
                    enter_last_name: 'Otangizni isimlarini kiriting',


                    surname: 'Familiya',
                    last_name: 'Otangizning ismi',
                    enter_full_name: 'To'liq ismingizni kiriting',
                    enter_phone_number: 'Telefon raqamingizni kiriting',
                    legal_entity: 'Yuridik shaxs',
                    legal_entity_register: 'Yuridik shaxsni ro'yxatdan o'tkazish',
                    inn: "STIR(INN)",
                    enter_inn: 'Kompaniyangizning STIR(INN) raqamini kiriting',
                    company: 'Kompaniya',
                    enter_company: 'Kompaniyangizning nomini kiriting',
                    pos: 'Lavozim',
                    position: 'Kompaniyadagi lavozimingizni kiriting',
// wait page
                    request_sent: 'So'rov yuborildi!',
                    request_sent_p: 'Ma'lumotlaringizni qayta ishlash uchun so'rovingiz yuborildi. \n Moderatsiyadan o'tgach, sizga xabar beriladi va marketplace foydalanish uchun ochiladi.',
//main_menu
                    search: 'Qidirish',
                    main_menu: 'Menu',
                    cart: 'Savat',
                    favs: 'Sevimlilar',
                    add_to_cart: 'Savatga qo'shish',
                    total_sum: 'Umumiy summa',
                    make_order: 'Buyurtma berish',
                    order_placed: 'Buyurtma berildi!',
                    order_placed_p: 'Buyurtmangiz qabul qilindi! \n Tez orada siz bilan bog'lanamiz.',
                    variations: [
                        'Eyakulyat diagnostikasi',
                        'EKO laboratoriyasi uchun muhitlar',
                        'Eyakulyatni tayyorlash',
                        'Kriokonservatsiya va vitrifikatsiya',
                        'Kateterlar',
                        'EKO laboratoriyasi uchun dezinfeksiya vositalari',
                    ],
                    existing_user: 'Men mijozman',
                    enter_phone_for_verification: 'Tekshirish uchun telefon raqamingizni kiriting',
                    verify: 'Tekshirish',
                    back: 'Orqaga',
                    user_not_found: 'Foydalanuvchi tizimda topilmadi',
                }
            },
        }
    });

export default i18next;