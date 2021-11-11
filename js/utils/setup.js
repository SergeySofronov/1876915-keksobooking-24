import { checkAdByFilters, getFormFilters } from './filter.js';

const ADS_MAX_NUMBER = 10;  // Максимальное количество отображаемых на карте объявлений

const houseTypesDictionary = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

//Вспомогательная функция для скрытия пустых полей в балуне маркера
const handleClonedNode = (element, elementProperty, propertyValue) => {
  if (propertyValue) {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
    element[elementProperty] = propertyValue;
  } else {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  }
};

//Функция подготовки данных для загрузки в балун маркера
const getPopupNodes = (userAdsArray) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardArray = [];
  const formFilters = getFormFilters();

  if (formFilters) {
    userAdsArray = userAdsArray.filter((userAd) => checkAdByFilters(userAd, formFilters));
  }

  for (const userAd of userAdsArray) {

    const cardClone = cardTemplate.cloneNode(true);
    const popupUserAvatar = cardClone.querySelector('.popup__avatar');
    const popupHouseTitle = cardClone.querySelector('.popup__title');
    const popupHouseAddress = cardClone.querySelector('.popup__text--address');
    const popupHousePrice = cardClone.querySelector('.popup__text--price');
    const popupHouseType = cardClone.querySelector('.popup__type');
    const popupHouseCapacity = cardClone.querySelector('.popup__text--capacity');
    const popupCheckInTime = cardClone.querySelector('.popup__text--time');
    const popupHouseDescription = cardClone.querySelector('.popup__description ');

    handleClonedNode(popupUserAvatar, 'src', userAd.author.avatar);
    handleClonedNode(popupHouseTitle, 'textContent', userAd.offer.title);
    handleClonedNode(popupHouseAddress, 'textContent', userAd.offer.address);
    handleClonedNode(popupHousePrice, 'textContent', `${userAd.offer.price}₽/ночь`);
    handleClonedNode(popupHouseType, 'textContent', houseTypesDictionary[userAd.offer.type]);
    handleClonedNode(popupHouseCapacity, 'textContent', `${userAd.offer.rooms} комнаты для ${userAd.offer.guests} гостей`);
    handleClonedNode(popupCheckInTime, 'textContent', `Заезд после ${userAd.offer.checkin}, выезд до ${userAd.offer.checkout}`);
    handleClonedNode(popupHouseDescription, 'textContent', userAd.offer.description);

    const popupHouseFeature = cardClone.querySelectorAll('.popup__feature');
    popupHouseFeature.forEach((item) => {
      const isFeatureInNode = (userAd.offer.features || []).some(
        (featureName) => item.classList.contains(`popup__feature--${featureName}`));
      if (!isFeatureInNode) {
        item.remove();
      }
    });

    const popupPhotoList = cardClone.querySelector('.popup__photos');
    const defaultPhoto = cardClone.querySelector('.popup__photo');
    popupPhotoList.innerHTML = '';
    if (userAd.offer.photos) {
      userAd.offer.photos.forEach((value, index) => {
        const newPhoto = defaultPhoto.cloneNode(false);
        newPhoto.src = value;
        newPhoto.alt += ` №${index + 1}`;
        popupPhotoList.append(newPhoto);
      });
    }

    cardArray.push({ userAdNode: cardClone, location: userAd.location });
    if (cardArray.length >= ADS_MAX_NUMBER) {
      break;
    }
  }

  return cardArray;
};

export { getPopupNodes };
