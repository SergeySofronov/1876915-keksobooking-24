const MIN_TITLE_LENGTH = '30';
const MAX_TITLE_LENGTH = '100';


const housePriceDictionary = {
  flat: '1000',
  palace: '10000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

//Селекторы форм
const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');

//Селекторы формы объявления
const adHouseTitle = formAd.querySelector('input[name="title"]');
const adHouseAddress = formAd.querySelector('input[name="address"]');
const adHouseType = formAd.querySelector('select[name="type"]');
const adHousePrice = formAd.querySelector('input[name="price"]');
const adRoomNumber = formAd.querySelector('select[name="rooms"]');
const adRoomCapacity = formAd.querySelector('select[name="capacity"]');
const adTimeIn = formAd.querySelector('select[name="timein"]');
const adTimeOut = formAd.querySelector('select[name="timeout"]');

//Функция активации/деактивации форм
const setFormState = (isDisable = true) => {
  const formAdClassDisable = 'ad-form--disabled';
  const formFilterClassDisable = 'map__filters--disabled';

  if (isDisable) {
    if (!formAd.classList.contains(formAdClassDisable)) {
      formAd.classList.add(formAdClassDisable);
    }
    if (!formFilter.classList.contains(formFilterClassDisable)) {
      formFilter.classList.add(formFilterClassDisable);
    }
  } else {
    if (formAd.classList.contains(formAdClassDisable)) {
      formAd.classList.remove(formAdClassDisable);
    }
    if (formFilter.classList.contains(formFilterClassDisable)) {
      formFilter.classList.remove(formFilterClassDisable);
    }
  }

  [...formAd.children].forEach((child) => child.disabled = isDisable);
  [...formFilter.children].forEach((child) => child.disabled = isDisable);
};

//Обработка валидации элемента
const reworkValidity = (element, message) => {
  if (message) {
    element.setCustomValidity(message);
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

//Событие изменения заголовка объявления
const onHouseTitleInput = (evt) => {
  const element = evt.target;
  const textLength = evt.target.value.length;
  let validityMessage = '';
  if (!element.minLength) {
    element.minLength = MIN_TITLE_LENGTH;
  }
  if (!element.maxLength) {
    element.maxLength = MAX_TITLE_LENGTH;
  }
  if (textLength < element.minLength) {
    validityMessage = `Минимум ${element.minLength} симв. Осталось ${element.minLength - textLength}`;
  }
  reworkValidity(element, validityMessage);
};

adHouseTitle.addEventListener('input', onHouseTitleInput);

//Событие изменения адреса жилья
const onHouseAddressInput = (evt) => {
  const element = evt.target;
  let validityMessage = '';
  if (element.validity.patternMismatch) {
    validityMessage = 'Введите координаты в виде: 56.02458,45.12345';
  }
  reworkValidity(element, validityMessage);
};

adHouseAddress.addEventListener('input', onHouseAddressInput);

//Событие изменения цены жилья
const onHousePriceInput = (evt) => {
  const element = evt.target;
  const regexp = /^[0][\d]+/;
  const currentHouseType = adHouseType.options[adHouseType.selectedIndex].value;
  const currentMinPrice = parseInt(housePriceDictionary[currentHouseType], 10);
  let validityMessage = '';
  if (element.value.match(regexp)) {
    element.value = element.value.slice(1);
  }
  const inputValue = parseInt(element.value, 10);
  if (inputValue < currentMinPrice) {
    validityMessage = `Цена ниже минимальной ${currentMinPrice}`;
  }
  reworkValidity(element, validityMessage);
};

adHousePrice.addEventListener('input', onHousePriceInput);

//Событие изменения типа жилья
const onHouseTypeChange = (evt) => {
  const element = evt.target;
  const selectedType = element.options[element.selectedIndex].value;
  adHousePrice.min = housePriceDictionary[selectedType];
  adHousePrice.placeholder = `От ${adHousePrice.min}`;
  const customEvt = new Event('input');
  adHousePrice.dispatchEvent(customEvt);
};

adHouseType.addEventListener('change', onHouseTypeChange);

//Событие изменения количества гостей
const onRoomNumberChange = (evt) => {
  const capacityList = adRoomCapacity.children;
  const capacityListClone = [...adRoomCapacity.children].map((child) => parseInt(child.value, 10));
  const currentRoomNumber = parseInt(adRoomNumber.options[adRoomNumber.selectedIndex].value, 10);
  capacityListClone.forEach((capacity, index) => {
    if (currentRoomNumber === 100 && capacityList[index].value !== '0') {
      capacityList[index].hidden = true;
    } else if (capacityListClone[index] > currentRoomNumber) {
      capacityList[index].hidden = true;
    } else {
      capacityList[index].hidden = false;
    }
  });
};
adRoomNumber.addEventListener('change', onRoomNumberChange);

//Событие изменения количества комнат
/*const onRoomNumberChange = (evt) => {
  const element = evt.target;
  const currentCapasity = adRoomCapacity.options[adRoomCapacity.selectedIndex].value;
};
adRoomNumber.addEventListener('change', onRoomNumberChange);*/




/*


const checkRoomNumber = (element) => {
  const roomNumber = element.options[element.selectedIndex].value;
  const roomCapacitySelector = formAd.querySelector('select[name="capacity"]');
  const roomCapacity = roomCapacitySelector.options[roomCapacitySelector.selectedIndex].value;
  if (setValidityForRoom(element, roomNumber, roomCapacity)) {
    roomCapacitySelector.setCustomValidity('');
    roomCapacitySelector.reportValidity();
  }
};

const checkRoomCapacity = (element) => {
  const roomCapacity = element.options[element.selectedIndex].value;
  const roomNumberSelector = formAd.querySelector('select[name="rooms"]');
  const roomNumber = roomNumberSelector.options[roomNumberSelector.selectedIndex].value;
  if (setValidityForRoom(element, roomNumber, roomCapacity)) {
    roomNumberSelector.setCustomValidity('');
    roomNumberSelector.reportValidity();
  }
};

const checkTime = (element) => {
  let timeSelector = 0;
  if (element.matches('[name="timein"]')) {
    timeSelector = formAd.querySelector('select[name="timeout"]');
  } else {
    timeSelector = formAd.querySelector('select[name="timein"]');
  }
  timeSelector.selectedIndex = element.selectedIndex;
};

const onAdFormInput = (evt) => {
  switch (evt.target.name) {
    case (adTitleSelector):
      onHouseTitleInput(evt.target);
      break;
    case (adAddressSelector):
      checkSelectedAddressPattern(evt.target);
      break;
    case (adHouseTypeSelector):
      checkSelectedHouseType(evt.target);
      break;
    case (adHousePriceSelector):
      checkSelectedPrice(evt.target);
      break;
    case (adRoomNumberSelector):
      checkRoomNumber(evt.target);
      break;
    case (adRoomCapacitySelector):
      checkRoomCapacity(evt.target);
      break;
    case (adTimeInSelector):
      checkTime(evt.target);
      break;
    case (adTimeOutSelector):
      checkTime(evt.target);
      break;
    default: break;
  }
};

formAd.addEventListener('input', onAdFormInput);

*/
export { setFormState };
