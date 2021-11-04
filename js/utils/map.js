import { onMarkerMoved } from './form.js';
import { getPopupNodes } from './setup.js';
import { getData } from './fetch.js';

const ICON_SPECIAL_SIZE = 52;
const ICON_USUAL_SIZE = 40;
const ICON_SPECIAL_URL = 'img/main-pin.svg';
const ICON_USUAL_URL = 'img/pin.svg';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const MAP_CONTAINER_ID = 'map-canvas';
const MAP_INIT_ZOOM = 12;
const MAP_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MARKER_INIT_LAT = 35.68897;
const MARKER_INIT_LNG = 139.7535;
const MARKER_SPECIAL = true;

let map;                      //Ссылка на карту
let mainMarker;               //Ссылка на пользовательский маркер
const markerHeap = [];          //Пустой массив для хранения маркеров
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
      autoPanSpeed: 3,
    },
  );
  if (isSpecial) {
    marker.on('moveend', onMarkerMoved);
  }
  return marker;
};

// Формирование массива маркеров и привязка их к карте
const createMarkerHeap = (markerPopupData) => {
  const userAds = getPopupNodes(markerPopupData);
  userAds.forEach((element, index) => {
    const { lat, lng } = element.location;
    markerHeap[index] = createMarker(lat, lng).bindPopup(element.userAdNode).addTo(map);
  });
};

//Сброс карты к начальному положению
const resetMap = () => {
  map.setView(defaultLocation, MAP_INIT_ZOOM);
  map.closePopup();
  mainMarker.setLatLng(defaultLocation);
};

const showMapError = () => {
  errorLine.classList.remove('map__error--hidden');
};

// Создание карты и запрос данных от сервера после загрузки карты
const createMap = (cb) => {
  map = L.map(MAP_CONTAINER_ID)
    .on('load', () => {
      cb();
      getData((markerPopupData) => createMarkerHeap(markerPopupData), showMapError);
    })
    .setView({
      lat: MARKER_INIT_LAT,
      lng: MARKER_INIT_LNG,
    }, MAP_INIT_ZOOM);

  L.tileLayer(MAP_TILE_URL, { attribution: MAP_ATTRIBUTION }).addTo(map);   // Создание плитки карты
  mainMarker = createMarker(0, 0, MARKER_SPECIAL).addTo(map);
  return map;
};

export { createMap, createMarkerHeap, createMarker, resetMap };
