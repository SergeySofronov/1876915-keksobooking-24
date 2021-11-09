import { setFormStateAll, onRoomNumberChange } from './utils/form.js';
import { createMap } from './utils/map.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;


// Деактивация формы
setFormStateAll(FORM_DISABLE);

// Создание карты
createMap(() => {
  setFormStateAll(FORM_ENABLE);
  onRoomNumberChange();
});
