import { getRandomFromRange, getNonRepeatUintArray, getRandomPartFromArray } from './utils.js';
const USER_ADS_COUNT = 10;
const USER_AVATAR_MIN = 1;
const USER_AVATAR_MAX = 10;
const TIME_MIN = 12;
const TIME_MAX = 14;
const PRICE_MULTIPLIER = 1000;
const AVATAR_BASE_URL = 'img/avatars/user';
const AVATAR_FORMAT = '.png';
const houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

/* createRandomAvatarUrl получает ссылку на безымянную функцию, создающую при вызове строку (url) типа
'AVATAR_BASE_URL + т + AVATAR_FORMAT', где m - значение, выбираемое из массива случайных целых неповторяющихся
чисел userAvatarsUrls, при помощи счетчика counter. Для практики по замыканиям функций + IIFE.*/
const createRandomAvatarUrl = (() => {
  const userAvatarsUrls = getNonRepeatUintArray(USER_AVATAR_MIN, USER_AVATAR_MAX, USER_AVATAR_MAX - USER_AVATAR_MIN + 1);
  let counter = 0;
  return () => {
    if (counter < USER_AVATAR_MAX) {
      const avatarUrl = `${AVATAR_BASE_URL}${userAvatarsUrls[counter] < 10 ? 0 : ''}${userAvatarsUrls[counter]}${AVATAR_FORMAT}`;
      counter++;
      return avatarUrl;
    } else {
      throw new Error('getRandomAvatarUrl: avatar counter limit!');
    }
  };
})();

const houseTypesDictionary = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Функция prepareUserAd возвращает объект userAd со случайными данными
const prepareUserAd = () => {

  const locationLat = getRandomFromRange(35.65, 35.7, true, 5);
  const locationLng = getRandomFromRange(139.7, 139.8, true, 5);
  const offerType = houseTypes[getRandomFromRange(0, houseTypes.length - 1)];
  const offerTittle = `Сдается жилье типа: ${(houseTypesDictionary[offerType]).toLowerCase()}`;
  const offerDescription = `Здесь может быть текст рекламы жилья типа "${(houseTypesDictionary[offerType]).toLowerCase()}"`;

  const userAd = {
    author: {
      avatar: createRandomAvatarUrl(),
    },
    offer: {
      type: `${offerType}`,
      typeRus: `${houseTypesDictionary[offerType]}`,
      title: `${offerTittle}`,
      address: `${locationLat}, ${locationLng}`,
      price: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX) * PRICE_MULTIPLIER,
      rooms: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX),
      guests: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX),
      checkin: `${getRandomFromRange(TIME_MIN, TIME_MAX)}:00`,
      checkout: `${getRandomFromRange(TIME_MIN, TIME_MAX)}:00`,
      features: getRandomPartFromArray(houseFeatures),
      description: `${offerDescription}`,
      photos: getRandomPartFromArray(photosArray),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
  return userAd;
};

const getRandomAds = () => {
  const adsArray = Array.from({ length: USER_ADS_COUNT }, prepareUserAd);
  return adsArray;
};

export { getRandomAds };
