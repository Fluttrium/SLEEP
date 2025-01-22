// constans.ts
export const diseases = [
    { title: "ОСТРАЯ ИНСОМНИЯ", testId: 1 },
    { title: "ХРОНИЧЕСКАЯ ИНСОМНИЯ", testId: 1 },
    { title: "СИНДРОМ БЕСПОКОЙНЫХ НОГ", testId: 1 },
    { title: "СИНДРОМ ОБСТРУКТИВНОГО АПНОЭ ВО СНЕ", testId: 1 },
    { title: "НАРКОЛЕПСИЯ  ТИП 1", testId: 1 },
    { title: "НАРКОЛЕПСИЯ  ТИП 2", testId: 1 },
    { title: "ИДИОПАТИЧЕСКАЯ ГИПЕРСОМНИЯ", testId: 1 },
    { title: "СИНДРОМ НЕДОСТАТОЧНОГО СНА", testId: 1 },
    { title: "СИНДРОМ ЗАДЕРЖКИ ФАЗЫ СНА-БОДРСТВОВАНИЯ", testId: 1 },
    { title: "СИНДРОМ ОПЕРЕЖЕНИЯ ФАЗЫ СНА-БОДРСТВОВАНИЯ", testId: 1 },
    { title: "НАРУШЕНИЕ СНА ПРИ СМЕННОЙ РАБОТЕ", testId: 1 },
    { title: "СТРАХИ ВО СНЕ", testId: 1 },
    { title: "НАРУШЕНИЕ ПОВЕДЕНИЯ В ФАЗУ МЕДЛЕННОГО СНА", testId: 1 },
    { title: "НАРУШЕНИЕ ПОВЕДЕНИЯ В ФАЗУ БЫСТРОГО СНА", testId: 1 },
    { title: "БРУКСИЗМ", testId: 1 },
];

interface Disease {
    id?: number; // Сделать id необязательным
    title: string;
    testId: number;
}

// создаём словарь для быстрого поиска
export const diseaseDictionary = diseases.reduce((acc: Record<string, Disease>, disease) => {
    acc[disease.title] = disease;
    return acc;
}, {});

export const categories = [
    {
      name: 'СPAP',
    },
    {
      name: 'BiPAP',
    },
    {
      name: 'Маски',
    },
    {
      name: 'Диагностическое оборудование',
    },
    {
      name: 'Акссесуары',
    },
    {
      name: 'Аренда',
    },
  ];
  
  export const _ingredients = [
    {
      name: 'Фильтры для СИПАП-аппаратов',
      price: 250,
      imageUrl:
        'https://cpapusa.ru/wa-data/public/shop/products/78/04/478/images/2639/2639.970x0.png',
    },
    {
      name: 'Шланг обогреваемый',
      price: 79,
      imageUrl:
        'https://cpapusa.ru/wa-data/public/shop/products/41/01/141/images/755/755.750x0.jpg',
    },
    {
      name: 'Дезинфектор',
      price: 79,
      imageUrl: 'https://kislorod.ru/upload/iblock/127/ripukwj2l4m25m8gi3mr6ukhd61h64r5/Oxygen_Plus_Sredstvo-600-min.jpg',
    },
    {
      name: 'Портативный аккумулятор',
      price: 59,
      imageUrl:
        'https://bravokislorod.ru/upload/iblock/86f/q6iekc0jw57i1gta4rmfugv98nh87cz9.png',
    },
    // {
    //   name: 'Нежный цыпленок',
    //   price: 79,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
    // },
    // {
    //   name: 'Шампиньоны',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
    // },
    // {
    //   name: 'Ветчина',
    //   price: 79,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
    // },
    // {
    //   name: 'Пикантная пепперони',
    //   price: 79,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
    // },
    // {
    //   name: 'Острая чоризо',
    //   price: 79,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
    // },
    // {
    //   name: 'Маринованные огурчики',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
    // },
    // {
    //   name: 'Свежие томаты',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
    // },
    // {
    //   name: 'Красный лук',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
    // },
    // {
    //   name: 'Сочные ананасы',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
    // },
    // {
    //   name: 'Итальянские травы',
    //   price: 39,
    //   imageUrl:
    //     'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
    // },
    // {
    //   name: 'Сладкий перец',
    //   price: 59,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
    // },
    // {
    //   name: 'Кубики брынзы',
    //   price: 79,
    //   imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
    // },
    // {
    //   name: 'Митболы',
    //   price: 79,
    //   imageUrl:
    //     'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
    // },
  ].map((obj, index) => ({ id: index + 1, ...obj }));
  
  export const products = [
    {
      name: 'AirFit F30i ResMed маска ротоносовая',
      imageUrl: 'https://www.resmed.market/upload/resize_cache/iblock/0f9/640_480_0/0f978cde742c546230a82344279a60e1.jpg',
      categoryId: 3,
    },
    {
      name: 'AirFit F40 ResMed ротоносовая',
      imageUrl: 'https://media.resmed.com/sites/6/20240222004537/healthcare-professionals-airfit-f40-airfit-f40-front-view.jpg',
      categoryId: 3,
    },
    {
      name: 'AirFit P10 ResMed маска канюльная',
      imageUrl: 'https://www.resmed.market/upload/resize_cache/iblock/1b8/640_480_0/1b8f25adbd62ff4773f2add1e5fea012.jpg',
      categoryId: 3,
    },
    {
      name: 'Mirage Quattro ResMed маска ротоносовая',
      imageUrl: 'https://basket-10.wbbasket.ru/vol1560/part156050/156050442/images/big/5.webp',
      categoryId: 3,
    },
    {
      name: 'AirFit N30I ResMed маска носовая',
      imageUrl: 'https://kislorod.ru/upload/iblock/fe3/airfit_n30i.jpg',
      categoryId: 3,
    },
    {
      name: 'AirFit N20 ResMed СИПАП-маска носовая',
      imageUrl: 'https://img.medicalexpo.ru/images_me/photo-mg/69836-17992259.jpg',
      categoryId: 3,
    },
    {
      name: 'AirFit F20 ResMed маска ротоносовая',
      imageUrl: 'https://porto2.ru/wp-content/uploads/2018/12/ResMed-AirFit-F20-maska-roto-nosovaya.jpg',
      categoryId: 3,
    },
    {
      name: 'Увлажнители для СИПАП-аппаратов',
      imageUrl: 'https://www.resmed.market/upload/resize_cache/iblock/2e6/640_480_0/2e6f74936b480424a81ad80b4b356baa.jpg',
      categoryId: 5,
    },
    {
      name: 'Скрининговое устройства для выявления апноэ сна в домашних условиях',
      imageUrl: 'https://somnolog-pulmonolog.ru/images/kardiorespiratornoe-monitorirovanie-v-domashnih-uslovijah.jpg',
      categoryId: 4,
    },
    {
      name: 'Портативный аккумулятор',
      imageUrl: 'https://ae04.alicdn.com/kf/S5d7b87188b5a4468a50762d75275803dL.jpg',
      categoryId: 5,
    },
    {
      name: 'Раствор дезинфицирующий',
      imageUrl: 'https://kislorod.ru/upload/iblock/31d/wp7jljplw87du7sqds37yswn6cwfgvng/Oxygen_Plus_Rastvor-600-min.jpg',
      categoryId: 5,
    },
    {
      name: 'Шланг обогреваемый',
      imageUrl: 'https://cpapusa.ru/wa-data/public/shop/products/41/01/141/images/755/755.750x0.jpg',
      categoryId: 5,
    },
    {
      name: 'Аренда СИПАП-аппарата',
      imageUrl: 'https://kislorod.ru/upload/iblock/84d/resmed_airsense_10.jpg',
      categoryId: 6,
    },
    {
      name: 'Аренда БИПАП-аппарата',
      imageUrl: 'https://cpimg.tistatic.com/09106882/b/4/Resmed-lumis-150-Bipap.jpg',
      categoryId: 6,
    },
  ];
  