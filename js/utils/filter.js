const DEFAULT_FILTER_TYPE = 'any';

const housePriceDictionary = {
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, Infinity],
  any: [0, Infinity],
};

const formFilters = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};

//Селекторы формы фильтрации объявлений
const formMapFilters = document.querySelector('.map__filters');
const filterHouseType = formMapFilters.querySelector('#housing-type');
const filterHousePrice = formMapFilters.querySelector('#housing-price');
const filterRoomNumber = formMapFilters.querySelector('#housing-rooms');
const filterGuestNumber = formMapFilters.querySelector('#housing-guests');
const filterHouseFeatures = formMapFilters.querySelector('#housing-features');

//
const checkHouseTypeFilter = (data, filter) => (data === filter || filter === DEFAULT_FILTER_TYPE);
//
const checkCommonFilter = (data, filter) => (data === parseInt(filter, 10) || filter === DEFAULT_FILTER_TYPE);
//
const checkPriceFilter = (data, filter) => {
  const filterPriceMin = housePriceDictionary[filter][0];
  const filterPriceMax = housePriceDictionary[filter][1];
  return (data >= filterPriceMin && data < filterPriceMax);
};
//
const checkFeaturesFilter = (data, filter) => {
  if (filter.length) {
    if (data) {
      return filter.every((item) => data.some((value) => value === item));
    }
    return false;
  }
  return true;
};

//
const checkAdByFilters = (userAd) => {
  const data = userAd.offer;
  return ([
    checkHouseTypeFilter(data.type, formFilters.type),
    checkCommonFilter(data.rooms, formFilters.rooms),
    checkCommonFilter(data.guests, formFilters.guests),
    checkPriceFilter(data.price, formFilters.price),
    checkFeaturesFilter(data.features, formFilters.features)]
    .every((value) => value === true)
  );
};

//Обновление параметров фильтров объявлений-------------
const setFilters = () => {
  formFilters.type = filterHouseType.options[filterHouseType.selectedIndex].value;
  formFilters.price = filterHousePrice.options[filterHousePrice.selectedIndex].value;
  formFilters.rooms = filterRoomNumber.options[filterRoomNumber.selectedIndex].value;
  formFilters.guests = filterGuestNumber.options[filterGuestNumber.selectedIndex].value;
  formFilters.features = [];
  filterHouseFeatures.querySelectorAll('.map__checkbox').forEach((child) => {
    if (child.checked) {
      formFilters.features.push(child.value);
    }
  });
};

//
const getFormFilters = () => formFilters;

export { checkAdByFilters, setFilters, getFormFilters };
