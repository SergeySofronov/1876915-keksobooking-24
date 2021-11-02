import { setFormState } from './utils/form.js';
import { createMap, createMarkerHeap, createMarker } from './utils/map.js';
import { getData, sendData } from './utils/fetch.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;
const MARKER_SPECIAL = true;

// Деактивация формы
setFormState(FORM_DISABLE);

// Создание карты
const map = createMap(()=>setFormState(FORM_ENABLE));

// Запрос данных с сервера и добавление маркеров на карту
getData((markerPopupData) => createMarkerHeap(markerPopupData, map), console.error);

// Добавление пользовательского маркера
const mainMarker = createMarker(0, 0, MARKER_SPECIAL);
mainMarker.addTo(map);
