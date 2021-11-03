import { setFormState } from './utils/form.js';
import { createMap, createMarkerHeap } from './utils/map.js';
import { getData } from './utils/fetch.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;
//const ERROR_MESSAGE = 'Не удалось загрузить данные с сервера';

// Деактивация формы
setFormState(FORM_DISABLE);

// Создание карты
createMap(() => setFormState(FORM_ENABLE));

// Запрос данных с сервера и добавление маркеров на карту
//getData((markerPopupData) => createMarkerHeap(markerPopupData), console.error);
