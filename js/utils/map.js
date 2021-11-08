import { onMarkerMoved } from './form.js';
import { getPopupNodes } from './setup.js';
import { getData } from './fetch.js';

const ICON_SPECIAL_SIZE = 52;
const ICON_USUAL_SIZE = 40;
const ICON_SPECIAL_URL = 'img/main-pin.svg';
const ICON_USUAL_URL = 'img/pin.svg';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_CONTAINER_ID = 'map-canvas';
const MAP_ERROR_MESSAGE = 'Ошибка при загрузке карты';
const MAP_INIT_ZOOM = 12;
const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_PAN_SPEED = 3;
const MARKER_INIT_LAT = 35.68897;
const MARKER_INIT_LNG = 139.7535;
const MARKER_SPECIAL = true;
const MARKER_MAX_NUMBER = 10;
const DATA_ERROR_MESSAGE = 'Ошибка при загрузке объявлений';

let map;                      //Ссылка на карту
let mainMarker;               //Ссылка на пользовательский маркер
let markerGroup;              //Ссылка на слой группы маркеров
const defaultLocation = {     //Объект с координатами по умолчанию
  lat: MARKER_INIT_LAT,
  lng: MARKER_INIT_LNG,
};

//Селекторы
const errorLine = document.querySelector('.map__error');
//---------------------------------------------------------------------------

// Пользовательские иконки маркера
const createMarkerIcon = (isSpecial = false) => {
  const url = isSpecial ? ICON_SPECIAL_URL : ICON_USUAL_URL;
  const size = isSpecial ? ICON_SPECIAL_SIZE : ICON_USUAL_SIZE;
  const icon = L.icon({
    iconUrl: url,
    iconSize: [size, size],
    iconAnchor: [(size / 2), size],
  });
  return icon;
};

// Создание маркера
const createMarker = (latValue, lngValue, isSpecial = false) => {
  const marker = L.marker(
    {
      lat: isSpecial ? MARKER_INIT_LAT : latValue,
      lng: isSpecial ? MARKER_INIT_LNG : lngValue,
    },
    {
      draggable: isSpecial,
      icon: createMarkerIcon(isSpecial),
      riseOnHover: true,
      autoPan: true,
      autoPanSpeed: MAP_PAN_SPEED,
    },
  );
  if (isSpecial) {
    marker.on('moveend', onMarkerMoved);  // Привязка обработчика события перемещения пользовательского маркера
  }
  return marker;
};

// Формирование массива маркеров и привязка их к карте
const createMarkerHeap = (markerPopupData, filters) => {
  markerGroup.clearLayers();
  getPopupNodes(markerPopupData, filters).slice(0, MARKER_MAX_NUMBER).forEach((element) => {
    const { lat, lng } = element.location;
    createMarker(lat, lng).bindPopup(element.userAdNode).addTo(markerGroup);

  });
};

//Сброс карты к начальному положению
const resetMap = () => {
  map.setView(defaultLocation, MAP_INIT_ZOOM);
  map.closePopup();
  mainMarker.setLatLng(defaultLocation);
};

//Уведомление об ошибке при загрузке карты
const onGetError = (errorMessage) => {
  errorLine.classList.remove('map__error--hidden');
  errorLine.textContent = errorMessage;
};

//Уведомление об ошибке при загрузке карты

//Запрос данных для маркеров от сервера
const getMarkerData = (filters, cb) => {
  getData((markerPopupData) => {
    createMarkerHeap(markerPopupData, filters);
  }, () => onGetError(DATA_ERROR_MESSAGE), cb);
};


// Создание карты
const createMap = (cb) => {
  map = L.map(MAP_CONTAINER_ID)
    .on('load', () => {
      getMarkerData(null, cb);
    })
    .setView({
      lat: MARKER_INIT_LAT,
      lng: MARKER_INIT_LNG,
    }, MAP_INIT_ZOOM);

  L.tileLayer(MAP_TILE_URL, { attribution: MAP_ATTRIBUTION })
    .on('tileerror', () => onGetError(MAP_ERROR_MESSAGE))
    .addTo(map);   // Создание плитки карты
  markerGroup = L.layerGroup().addTo(map);
  mainMarker = createMarker(0, 0, MARKER_SPECIAL).addTo(map);
  return map;
};

export { createMap, createMarker, resetMap, getMarkerData };
