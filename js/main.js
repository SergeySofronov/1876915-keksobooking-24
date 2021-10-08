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

//-------------------Функции ниже должный быть вынесены в отдельный модуль------------------------------------------------------
//Функция getRandomInt, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomInt(lowerBound, upperBound) {
  return Math.floor(lowerBound + Math.random() * (upperBound - lowerBound + 1));
}

/*Функция getRandomFloat, возвращающая случайное дробное число из переданного диапазона.
Включение верхней границы диапазона зависит от Math.random() и округления операции сложения.*/
function getRandomFloat(lowerBound, upperBound) {
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

/*Функция getRandomFloat, возвращающая случайное дробное число из переданного диапазона включительно.
Значение параметра valueAfterComma определяет количество знаков после запятой.*/
function getRandomFloatStrict(lowerBound, upperBound, valueAfterComma) {
  return Number((getRandomFloat(lowerBound, upperBound) + 1 / Math.pow(10, valueAfterComma + 1)).toFixed(valueAfterComma));
}

/*Функция getRandomFloat2, возвращающая случайное целое или дробное число из переданного диапазона включительно
с возможностью ограничения количества знаков после запятой.*/
function getRandomFromRange(lowerBound, upperBound, isFloating, valueAfterComma) {
  const maxValue = Math.max(lowerBound, upperBound);
  const minValue = Math.min(lowerBound, upperBound);

  if (~Math.sign(lowerBound | upperBound | isFloating)) {
    if (!isFloating) {
      return getRandomInt(minValue, maxValue);
    } else if (!Number.isInteger(valueAfterComma)) {
      return getRandomFloat(minValue, maxValue);
    } else {
      return getRandomFloatStrict(minValue, maxValue, valueAfterComma);
    }
  }
  throw new Error('getRandomFromRange: attribute negative');
}

/*Функция-генератор generateNonRepeatArray возвращает массив длиной arrayLength случайных не повторяющихся
целых чисел из диапазона от lowerBorder до upperBorder.*/
function getNonRepeatUintArray(lowerBorder, upperBorder, arrayLength) {
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let lower = Math.ceil(Math.min(Math.abs(lowerBorder), Math.abs(upperBorder)));
  const upper = Math.floor(Math.max(Math.abs(lowerBorder), Math.abs(upperBorder)));
  let totalNumbers = Math.abs(upper - lower) + 1;
  if (arrayLength && (totalNumbers >= arrayLength)) {
    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + lower);
    }
    while (arrayTotalNumbers.length) {
      lower = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[lower]);
      arrayTotalNumbers.splice(lower, 1);
    }
    return arrayRandomNumbers;
  }
  throw new Error('generateNonRepeatArray: wrong attributes');
}
//--------------------------------------------------------------------------------

function getRandomPartFromArray(inputArray) {
  if (Array.isArray(inputArray)) {
    return inputArray.slice(0, getRandomFromRange(1, inputArray.length));
  }
  return new Error('getRandomPartFromArray: inputArray is not an array');
}

/* createRandomAvatarUrl получает ссылку на безымянную функцию, создающую при вызове строку (url) типа
'AVATAR_BASE_URL + т + AVATAR_FORMAT', где m - значение, выбираемое из массива случайных целых неповторяющихся
чисел userAvatarsUrls, при помощи счетчика counter. Для практики по замыканиям функций + IIFE.*/
const createRandomAvatarUrl = (function () {
  const userAvatarsUrls = getNonRepeatUintArray(USER_AVATAR_MIN, USER_AVATAR_MAX, USER_AVATAR_MAX - USER_AVATAR_MIN + 1);
  let counter = 0;
  return function () {
    if (counter < USER_AVATAR_MAX) {
      const avatarUrl = `${AVATAR_BASE_URL}${counter < 10 ? 0 : ''}${userAvatarsUrls[counter]}${AVATAR_FORMAT}`;
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

const createUserAd = () => {

  const locationLat = getRandomFromRange(35.65, 35.7, true, 5);
  const locationLng = getRandomFromRange(139.7, 139.8, true, 5);
  const offerType = houseTypes[getRandomFromRange(0, houseTypes.length - 1)];
  const offerTittle = `Сдается жилье типа ${(houseTypesDictionary[offerType]).toLowerCase()}`;
  const offerDescription = `Здесь может быть текст рекламы жилья типа "${(houseTypesDictionary[offerType]).toLowerCase()}"`;

  const userAd = {
    author: {
      avatar: createRandomAvatarUrl(),
    },
    offer: {
      type: offerType,
      title: offerTittle,
      address: `${locationLat}, ${locationLng}`,
      price: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX) * PRICE_MULTIPLIER,
      rooms: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX),
      guests: getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX),
      checkin: `${getRandomFromRange(TIME_MIN, TIME_MAX)}:00`,
      checkout: `${getRandomFromRange(TIME_MIN, TIME_MAX)}:00`,
      features: getRandomPartFromArray(houseFeatures),
      description: offerDescription,
      photos: getRandomPartFromArray(photosArray),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
  return userAd;
};

const userAdsArray = Array.from({ length: USER_ADS_COUNT }, createUserAd);
userAdsArray[0];
