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
с возможностью ограничения количества знаков после запятой.
*/
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
  throw 'error: attribute negative';
}

getRandomFromRange(5, 15, true, 5);

//------------------------------------------------

function getNonRepeatArray(lowerBorder, upperBorder, arrayLength) {
  if (arrayLength && ((Math.abs(upperBorder - lowerBorder) + 1) >= arrayLength)) {
    const tempArray = new Array(arrayLength);
    let tempValue;
    for (let index = 0; index < tempArray.length; index++) {
      do {
        tempValue = getRandomFromRange(lowerBorder, upperBorder);
      } while (tempArray.some((value) => value === tempValue));
      tempArray[index] = tempValue;
    }
    return tempArray;
  }
  throw 'error: wrong parameters in getNonRepeatArray';
}


const USER_ADS_MAX = 10,
  USER_AVATAR_MIN = 1,
  USER_AVATAR_MAX = 10,
  TIME_MIN = 12,
  TIME_MAX = 14;
const userAvatarsUrls = Array.from(getNonRepeatArray(USER_AVATAR_MIN, USER_AVATAR_MAX, USER_AVATAR_MAX - USER_AVATAR_MIN + 1), (value) => `img/avatars/user${value < 10 ? `0${value}` : value}.png`);
const houseFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const getRandomValue = () => getRandomFromRange(USER_AVATAR_MIN, USER_AVATAR_MAX);
const getRandomTime = () => getRandomFromRange(TIME_MIN, TIME_MAX);
const getRandomArrayElement = (items) => items[getRandomFromRange(0, items.length - 1)];
const getRandomRangeFromArray = (items) => {
  let upperValue, lowerValue;
  do {
    upperValue = getRandomFromRange(0, items.length);
    lowerValue = getRandomFromRange(0, items.length);
  } while (upperValue === lowerValue);
  if (lowerValue < upperValue) {
    return items.slice(lowerValue, upperValue);
  } else {
    return items.slice(upperValue, lowerValue);
  }
};

function UserAd(avatarUrl, description) {
  this.author = {
    avatar: avatarUrl,
  };
  this.location = {
    lat: getRandomFromRange(35.65, 35.7, true, 5),
    lng: getRandomFromRange(139.7, 139.8, true, 5),
  };
  this.offer = {
    type: getRandomArrayElement(houseTypes),
    title: `Сдается жилье типа ${getRandomArrayElement(houseTypes)}`, //как задать title с помощью type?
    address: `${this.location.lat}, ${this.location.lng}`,
    price: getRandomValue() * 1000,
    rooms: getRandomValue(),
    guests: getRandomValue(),
    checkin: `${getRandomTime()}:00`,
    checkout: `${getRandomTime()}:00`,
    features: getRandomRangeFromArray(houseFeatures),
    description: `${description}`,
    photos: getRandomRangeFromArray(photosArray),
  };
}

function createUserAds() {
  const userAdsArray = [];
  for (let index = 0; index < USER_ADS_MAX; index++) {
    userAdsArray[index] = new UserAd(userAvatarsUrls[index], `description+${index}`);
  }
  return userAdsArray;
}

createUserAds();
