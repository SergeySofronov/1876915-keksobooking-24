import { setFormState } from './utils/form.js';
import { getCardsNodes } from './utils/setup.js';
import { createMap, createMarker } from './utils/map.js';

const FORM_DISABLE = true;
const FORM_ENABLE = false;
const MARKER_SPECIAL = true;

setFormState(FORM_DISABLE);
const userAds = getCardsNodes();
const userMarkers = [];
const map = createMap(() => setFormState(FORM_ENABLE));

userAds.forEach((element, index) => {
  const { lat, lng } = element.location;
  userMarkers[index] = createMarker(lat, lng).bindPopup(element.userAdNode).addTo(map);
});

const mainMarker = createMarker(0, 0, MARKER_SPECIAL);
mainMarker.addTo(map);

