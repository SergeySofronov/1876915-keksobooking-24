import { setFormStateDisabled } from './utils/form.js';
import { getCardsNodes } from './utils/setup.js';

setFormStateDisabled();
const userAds = getCardsNodes();
document.querySelector('#map-canvas').append(userAds[0]);
