const DEFAULT_FILTER_TYPE = 'any';

const houseTypesDictionary = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const housePriceDictionary = {
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, Infinity],
  any: [0, Infinity],
};

const handleClonedElement = (element, elementProperty, propertyValue) => {
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

const filterAds = (userAd, filters) => {
  let filterPriceMin;
  let filterPriceMax;
  let featureLength = 0;

  if (filters) {
    filterPriceMin = housePriceDictionary[filters.price][0];
    filterPriceMax = housePriceDictionary[filters.price][1];

    if (userAd.offer.type === filters.type || filters.type === DEFAULT_FILTER_TYPE) {
      if (userAd.offer.price >= filterPriceMin && userAd.offer.price < filterPriceMax) {
        if (userAd.offer.rooms === parseInt(filters.rooms, 10) || filters.rooms === DEFAULT_FILTER_TYPE) {
          if (userAd.offer.guests === parseInt(filters.guests, 10) || filters.guests === DEFAULT_FILTER_TYPE) {
            if (filters.features.length) {
              if (userAd.offer.features) {
                filters.features.forEach((item) => {
                  featureLength += userAd.offer.features.some((value) => value === item);
                });
                if (featureLength === filters.features.length) {
                  return true;
                }
              }
            } else {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  return true;
};

const getPopupNodes = (userAdsArray, filters) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardArray = [];

  userAdsArray.forEach((userAd) => {

    if (filterAds(userAd, filters)) {
      const cardClone = cardTemplate.cloneNode(true);
      const popupAvatarElement = cardClone.querySelector('.popup__avatar');
      const popupTitleElement = cardClone.querySelector('.popup__title');
      const popupAddressElement = cardClone.querySelector('.popup__text--address');
      const popupPriceElement = cardClone.querySelector('.popup__text--price');
      const popupTypeElement = cardClone.querySelector('.popup__type');
      const popupCapacityElement = cardClone.querySelector('.popup__text--capacity');
      const popupTimeElement = cardClone.querySelector('.popup__text--time');
      const popupDescriptionElement = cardClone.querySelector('.popup__description ');

      handleClonedElement(popupAvatarElement, 'src', userAd.author.avatar);
      handleClonedElement(popupTitleElement, 'textContent', userAd.offer.title);
      handleClonedElement(popupAddressElement, 'textContent', userAd.offer.address);
      handleClonedElement(popupPriceElement, 'textContent', `${userAd.offer.price}₽/ночь`);
      handleClonedElement(popupTypeElement, 'textContent', houseTypesDictionary[userAd.offer.type]);
      handleClonedElement(popupCapacityElement, 'textContent', `${userAd.offer.rooms} комнаты для ${userAd.offer.guests} гостей`);
      handleClonedElement(popupTimeElement, 'textContent', `Заезд после ${userAd.offer.checkin}, выезд до ${userAd.offer.checkout}`);
      handleClonedElement(popupDescriptionElement, 'textContent', userAd.offer.description);

      const popupFeatureElement = cardClone.querySelectorAll('.popup__feature');
      popupFeatureElement.forEach((nodeItem) => {
        const isFeatureInNode = (userAd.offer.features || []).some(
          (featureName) => nodeItem.classList.contains(`popup__feature--${featureName}`));
        if (!isFeatureInNode) {
          nodeItem.remove();
        }
      });

      const popupPhotoList = cardClone.querySelector('.popup__photos');
      const photoDefaultElement = cardClone.querySelector('.popup__photo');
      popupPhotoList.innerHTML = '';
      if (userAd.offer.photos) {
        userAd.offer.photos.forEach((value, index) => {
          const photoNewElement = photoDefaultElement.cloneNode(false);
          photoNewElement.src = value;
          photoNewElement.alt += ` №${index + 1}`;
          popupPhotoList.append(photoNewElement);
        });
      }

      cardArray.push({ userAdNode: cardClone, location: userAd.location });
    }
  });

  return cardArray;
};

export { getPopupNodes};
