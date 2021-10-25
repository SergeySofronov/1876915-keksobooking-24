import { setFormState } from './utils/form.js';
import { getCardsNodes } from './utils/setup.js';
const FORM_DISABLE = true;
const FORM_ENABLE = false;

setFormState(FORM_DISABLE) ;
const userAds = getCardsNodes();
setFormState(FORM_ENABLE);
document.querySelector('#map-canvas').append(userAds[0]);
