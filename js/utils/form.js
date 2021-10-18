const setFormStateDisabled = () => {
  const formAd = document.querySelector('.ad-form');
  if (!formAd.classList.contains('ad-form--disabled')) {
    formAd.classList.add('ad-form--disabled');
    [...formAd.children].forEach((child) => child.disabled = true);
  }

  const formFilter = document.querySelector('.map__filters');
  if (!formFilter.classList.contains('map__filters--disabled')) {
    formFilter.classList.add('map__filters--disabled');
    [...formFilter.children].forEach((child) => child.disabled = true);
  }
};

const setFromStateEnabled = () => {
  const formAd = document.querySelector('.ad-form');
  if (!formAd.classList.contains('ad-form--disabled')) {
    formAd.classList.remove('ad-form--disabled');
    [...formAd.children].forEach((child) => child.disabled = true);
  }

  const formFilter = document.querySelector('.map__filters');
  if (!formFilter.classList.contains('map__filters--disabled')) {
    formFilter.classList.remove('map__filters--disabled');
    [...formFilter.children].forEach((child) => child.disabled = true);
  }
};

export { setFormStateDisabled, setFromStateEnabled };

