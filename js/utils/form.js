import { sendData } from './fetch.js';
import { resetMap, getMarkerData } from './map.js';
import { debounce } from './debounce.js';

const MAX_GPS_LENGTH = 5;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOM_NUMBER = 100;
const MIN_TITLE_LENGTH = 30;
const ZERO_GUEST_VALUE = 0;
const FORM_DISABLE = true;
const FORM_ENABLE = false;
const DEBOUNCE_TIME = 500;
const MESSAGE_CLOSE_TIME = 3000;

const KeyEnum = {
  ESC: 'Escape',
};

const housePriceDictionary = {
  flat: '1000',
  palace: '10000',
  house: '5000',
  bungalow: '0',
  hotel: '2000',
};

const validityObject = {
  message: '',
};

const filters = {
  type: 'flat',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

//Селекторы форм
const formAd = document.querySelector('.ad-form');
const formMapFilters = document.querySelector('.map__filters');

//Селекторы формы объявления
const adHouseTitle = formAd.querySelector('#title');
const adHouseAddress = formAd.querySelector('#address');
const adHouseType = formAd.querySelector('#type');
const adHousePrice = formAd.querySelector('#price');
const adRoomNumber = formAd.querySelector('#room_number');
const adRoomCapacity = formAd.querySelector('#capacity');
const adTimeField = formAd.querySelector('.ad-form__element--time');
const adTimeIn = formAd.querySelector('#timein');
const adTimeOut = formAd.querySelector('#timeout');
const adReset = formAd.querySelector('.ad-form__reset');

//Селекторы формы фильтрации объявлений
const filterHouseType = formMapFilters.querySelector('#housing-type');
const filterHousePrice = formMapFilters.querySelector('#housing-price');
const filterRoomNumber = formMapFilters.querySelector('#housing-rooms');
const filterGuestNumber = formMapFilters.querySelector('#housing-guests');
const filterHouseFeatures = formMapFilters.querySelector('#housing-features');

//Селекторы шаблонов сообщений
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.body.appendChild(successMessageTemplate.cloneNode(true));
const errorMessage = document.body.appendChild(errorMessageTemplate.cloneNode(true));
const errorMessageButton = errorMessage.querySelector('.error__button');

//-------------------------------------------------------------------------------------------
//Функция активации/деактивации форм
const setFormState = (isDisable = true, formSelector) => {
  const formList = [[formAd, 'ad-form--disabled'], [formMapFilters, 'map__filters--disabled']];
  let selector = formSelector;
  let index = formList.length - 1;

  do {
    if (!selector) {
      selector = formList[index][0];
    } else {
      index = 0;
    }
    if (isDisable) {
      if (!selector.classList.contains(formList[index][1])) {
        selector.classList.add(formList[index][1]);
      }
    } else {
      selector.classList.remove(formList[index][1]);
    }
    [...selector.children].forEach((child) => child.disabled = isDisable);
    selector = '';
  } while (index--);
};

//Обновление параметров фильтров объявлений-------------
const setFilters = () => {
  filters.type = filterHouseType.options[filterHouseType.selectedIndex].value;
  filters.price = filterHousePrice.options[filterHousePrice.selectedIndex].value;
  filters.rooms = filterRoomNumber.options[filterRoomNumber.selectedIndex].value;
  filters.guests = filterGuestNumber.options[filterGuestNumber.selectedIndex].value;
  filters.features = [];
  filterHouseFeatures.querySelectorAll('.map__checkbox').forEach((child) => {
    if (child.checked) {
      filters.features.push(child.value);
    }
  });
};

// Обработчик события изменения фильтров объявления------
const debounceFilterChange = debounce(() => {
  setFormState(FORM_DISABLE, formMapFilters);
  setFilters();
  getMarkerData(filters, () => setFormState(FORM_ENABLE, formMapFilters));
}, DEBOUNCE_TIME);

const onFilterChange = () => {
  debounceFilterChange();
};

formMapFilters.addEventListener('change', onFilterChange);

//Обработка валидации элемента --------------------------
const handleValidity = (element, validity) => {
  if (validity.message) {
    element.setCustomValidity(validity.message);
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
  validity.message = '';
};

//Событие изменения адреса по перемещению маркера
const onMarkerMoved = (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  adHouseAddress.value = `${parseFloat(lat).toFixed(MAX_GPS_LENGTH)}, ${parseFloat(lng).toFixed(MAX_GPS_LENGTH)}`;
};

//Событие изменения заголовка объявления ----------------
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

//Событие изменения цены жилья -------------------------
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

//Событие изменения типа жилья -------------------------
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
      if (capacityItem.value === String(ZERO_GUEST_VALUE)) {
        capacityItem.hidden = false;
        adRoomCapacity.selectedIndex = capacityItem.index;
      }
    } else if (+capacityItem.value <= currentRoomValue && capacityItem.value !== String(ZERO_GUEST_VALUE)) {
      capacityItem.hidden = false;
      if (currentCapacity.hidden || currentCapacity.value === String(ZERO_GUEST_VALUE)) {
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

//Сброс форм и карты к значениям по умолчанию-----------------
const onFormReset = () => {
  formAd.reset();
  formMapFilters.reset();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  resetMap();
  onFilterChange();
  adHouseType.dispatchEvent(new Event('change'));
  adHouseTitle.dispatchEvent(new Event('input'));
};
adReset.addEventListener('click', onFormReset);

//Обработка сообщения об успешном создании объявления, сброс формы adForm------
const onSuccessMessageClose = (evt) => {
  if ((evt.type !== 'keydown') || (evt.type === 'keydown' && evt.key === KeyEnum.ESC)) {
    successMessage.hidden = true;
    successMessage.removeEventListener('click', onSuccessMessageClose);
    successMessage.removeEventListener('keydown', onSuccessMessageClose);
    onFormReset();
  }
};

const showSuccessMessage = () => {
  successMessage.hidden = false;
  successMessage.addEventListener('click', onSuccessMessageClose);
  successMessage.addEventListener('keydown', onSuccessMessageClose);
  successMessage.tabIndex = '-1';
  successMessage.focus();
  setTimeout(() => {
    successMessage.dispatchEvent(new Event('click'));
  }, MESSAGE_CLOSE_TIME);
};

//Обработка сообщения об ошибке создания объявления-----------------------
const onErrorMessageClose = () => {
  errorMessage.hidden = true;
  errorMessageButton.removeEventListener('click', onErrorMessageClose);
};

const showErrorMessage = () => {
  errorMessage.hidden = false;
  errorMessageButton.addEventListener('click', onErrorMessageClose);
};

//Событие отправки формы--------------------------------------------------
const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    showSuccessMessage,
    showErrorMessage,
    formAd);
};
formAd.addEventListener('submit', onFormSubmit);

export { setFormState, onMarkerMoved, onRoomNumberChange };
