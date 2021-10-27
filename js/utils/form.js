const MIN_TITLE_LENGTH = '30';
const MAX_TITLE_LENGTH = '100';
const MAX_ROOM_NUMBER = 100;
const ZERO_GUEST_VALUE = '0';

const housePriceDictionary = {
  flat: '1000',
  palace: '10000',
  house: '5000',
  bungalow: '0',
  hotel: '3000',
};

const validityObject = {
  message: '',
};

//Селекторы форм
const formAd = document.querySelector('.ad-form');
const formFilter = document.querySelector('.map__filters');

//Селекторы формы объявления
const adHouseTitle = formAd.querySelector('input[name="title"]');
//const adHouseAddress = formAd.querySelector('input[name="address"]');
const adHouseType = formAd.querySelector('select[name="type"]');
const adHousePrice = formAd.querySelector('input[name="price"]');
const adRoomNumber = formAd.querySelector('select[name="rooms"]');
const adRoomCapacity = formAd.querySelector('select[name="capacity"]');
const adTimeField = formAd.querySelector('.ad-form__element--time');

const adTimeIn = formAd.querySelector('select[name="timein"]');
const adTimeOut = formAd.querySelector('select[name="timeout"]');

//Обработка валидации элемента --------------------
const handleValidity = (element, validity) => {
  if (validity.message) {
    element.setCustomValidity(validity.message);
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
  validity.message = '';
};

//Событие изменения заголовка объявления --------------------
const onHouseTitleInput = (evt) => {
  const element = evt.target;
  const textLength = element.value.length;
  if (!element.minLength) {
    element.minLength = MIN_TITLE_LENGTH;
  }
  if (!element.maxLength) {
    element.maxLength = MAX_TITLE_LENGTH;
  }
  if (textLength < element.minLength) {
    validityObject.message = `Минимум ${element.minLength} симв. Осталось ${element.minLength - textLength}`;
  }
  handleValidity(element, validityObject);
};

adHouseTitle.addEventListener('input', onHouseTitleInput);

//Событие изменения цены жилья --------------------
const onHousePriceInput = (evt) => {
  const element = evt.target;
  const regexp = /^[0]\d+/;
  const currentHouseType = adHouseType.options[adHouseType.selectedIndex].value;
  const currentMinPrice = parseInt(housePriceDictionary[currentHouseType], 10);
  if (element.value.match(regexp)) {
    element.value = element.value.slice(1);
  }
  const inputValue = parseInt(element.value, 10);
  if (inputValue < currentMinPrice) {
    validityObject.message = `Цена ниже минимальной ${currentMinPrice}`;
  }
  handleValidity(element, validityObject);
};

adHousePrice.addEventListener('input', onHousePriceInput);

//Событие изменения типа жилья --------------------
const onHouseTypeChange = (evt) => {
  const element = evt.target;
  const selectedType = element.options[element.selectedIndex].value;
  adHousePrice.min = housePriceDictionary[selectedType];
  adHousePrice.placeholder = `От ${adHousePrice.min}`;
  const customEvt = new Event('input');
  adHousePrice.dispatchEvent(customEvt);
};

adHouseType.addEventListener('change', onHouseTypeChange);

//Событие изменения количества гостей --------------------
const onRoomNumberChange = () => {
  const capacityList = [...adRoomCapacity.children];
  const currentCapacity = adRoomCapacity.options[adRoomCapacity.selectedIndex];
  const currentRoomValue = parseInt(adRoomNumber.options[adRoomNumber.selectedIndex].value, 10);
  capacityList.forEach((capacityItem) => {
    capacityItem.hidden = true;
    if (currentRoomValue === MAX_ROOM_NUMBER) {
      if (capacityItem.value === ZERO_GUEST_VALUE) {
        capacityItem.hidden = false;
        adRoomCapacity.selectedIndex = capacityItem.index;
      }
    } else if (+capacityItem.value <= currentRoomValue && capacityItem.value !== ZERO_GUEST_VALUE) {
      capacityItem.hidden = false;
      if (currentCapacity.hidden || currentCapacity.value === '0') {
        adRoomCapacity.selectedIndex = capacityItem.index;
      }
    }
  });
};

adRoomNumber.addEventListener('change', onRoomNumberChange);

//Событие изменения времени заезда/выезда --------------------
const onTimeChange = (evt) => {
  if (evt.target === adTimeIn) {
    adTimeOut.selectedIndex = evt.target.selectedIndex;
  } else if (evt.target === adTimeOut) {
    adTimeIn.selectedIndex = evt.target.selectedIndex;
  }
};

adTimeField.addEventListener('change', onTimeChange);

//Функция активации/деактивации форм --------------------
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
    onRoomNumberChange();
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

export { setFormState };
