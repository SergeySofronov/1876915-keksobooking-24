import { setFormState, onRoomNumberChange } from './utils/form.js';
import { createMap } from './utils/map.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;


// Деактивация формы
setFormState(FORM_DISABLE);

// Создание карты
createMap(() => {
  setFormState(FORM_ENABLE);
  onRoomNumberChange();
});
