import { setFormState } from './utils/form.js';
import { getCardsNodes } from './utils/setup.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;
setFormState(FORM_DISABLE);

// Создание карты
const map = L.map('map-canvas')
  .on('load', () => setFormState(FORM_ENABLE))
  .setView({
    lat: 35.68897,
    lng: 139.7535,
  }, 12);

// Создание плитки карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Создание пользовательской иконки маркера
const mainPinIcon = L.icon({
  iconUrl: '../leaflet/images/marker-icon.png',
  iconSize: [26, 42],
  iconAnchor: [13, 52],
});

// Создание маркера
const marker = L.marker(
  {
    lat: 35.68897,
    lng: 139.7535,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map)
  .bindPopup();

//Привязка события маркера
marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});



//
//const userAds = getCardsNodes();

