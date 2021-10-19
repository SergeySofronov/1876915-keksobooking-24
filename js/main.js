import { setFormState } from './utils/form.js';
import { getCardsNodes } from './utils/setup.js';
const FORM_DISABLE = false;
//const FORM_ENABLE = true;

setFormState(FORM_DISABLE);
const userAds = getCardsNodes();
document.querySelector('#map-canvas').append(userAds[0]);
