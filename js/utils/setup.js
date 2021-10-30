import { getRandomAds } from './data.js';

const reworkClonedElement = function (element, elementProperty, propertyValue) {
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

const getCardsNodes = function () {
  const userAdsArray = getRandomAds();
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const cardArray = [];

  userAdsArray.forEach((userAd) => {

    const cardClone = cardTemplate.cloneNode(true);
    const popupAvatarElement = cardClone.querySelector('.popup__avatar');
    const popupTitleElement = cardClone.querySelector('.popup__title');
    const popupAddressElement = cardClone.querySelector('.popup__text--address');
    const popupPriceElement = cardClone.querySelector('.popup__text--price');
    const popupTypeElement = cardClone.querySelector('.popup__type');
    const popupCapacityElement = cardClone.querySelector('.popup__text--capacity');
    const popupTimeElement = cardClone.querySelector('.popup__text--time');
    const popupDescriptionElement = cardClone.querySelector('.popup__description ');

    reworkClonedElement(popupAvatarElement, 'src', userAd.author.avatar);
    reworkClonedElement(popupTitleElement, 'textContent', userAd.offer.title);
    reworkClonedElement(popupAddressElement, 'textContent', userAd.offer.address);
    reworkClonedElement(popupPriceElement, 'textContent', `${userAd.offer.price}₽/ночь`);
    reworkClonedElement(popupTypeElement, 'textContent', userAd.offer.typeRus);
    reworkClonedElement(popupCapacityElement, 'textContent', `${userAd.offer.rooms} комнаты для ${userAd.offer.guests} гостей`);
    reworkClonedElement(popupTimeElement, 'textContent', `Заезд после ${userAd.offer.checkin}, выезд до ${userAd.offer.checkout}`);
    reworkClonedElement(popupDescriptionElement, 'textContent', userAd.offer.description);

    const popupFeatureElement = cardClone.querySelectorAll('.popup__feature');
    popupFeatureElement.forEach((nodeItem) => {
      const isFeatureInNode = userAd.offer.features.some(
        (featureName) => nodeItem.classList.contains(`popup__feature--${featureName}`));
      if (!isFeatureInNode) {
        nodeItem.remove();
      }
    });

    const popupPhotoList = cardClone.querySelector('.popup__photos');
    const photoDefaultElement = cardClone.querySelector('.popup__photo');
    popupPhotoList.innerHTML = '';
    userAd.offer.photos.forEach((value, index) => {
      const photoNewElement = photoDefaultElement.cloneNode(false);
      photoNewElement.src = value;
      photoNewElement.alt += ` №${index + 1}`;
      popupPhotoList.append(photoNewElement);
    });

    cardArray.push({userAdNode: cardClone, location: userAd.location});
  });

  return cardArray;
};

export { getCardsNodes };
