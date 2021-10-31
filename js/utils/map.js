import { onMarkerMoved } from './form.js';

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

//Пользовательские иконки маркера
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

// Функция создания карты
const createMap = (cb) => {
  const map = L.map(MAP_CONTAINER_ID)
    .on('load', cb)
    .setView({
      lat: MARKER_INIT_LAT,
      lng: MARKER_INIT_LNG,
    }, MAP_INIT_ZOOM);

  // Создание плитки карты
  L.tileLayer(MAP_TILE_URL, { attribution: MAP_ATTRIBUTION }).addTo(map);
  return map;
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

export { createMap, createMarker };
