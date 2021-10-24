const setFormState = (isDisabled = true) => {
  const formAd = document.querySelector('.ad-form');
  const formFilter = document.querySelector('.map__filters');

  if (isDisabled) {
    if (!formAd.classList.contains('ad-form--disabled')) {
      formAd.classList.add('ad-form--disabled');
    }
    if (!formFilter.classList.contains('map__filters--disabled')) {
      formFilter.classList.add('map__filters--disabled');
    }
  } else {
    if (formAd.classList.contains('ad-form--disabled')) {
      formAd.classList.remove('ad-form--disabled');
    }
    if (formFilter.classList.contains('map__filters--disabled')) {
      formFilter.classList.remove('map__filters--disabled');
    }
  }

  [...formAd.children].forEach((child) => child.disabled = isDisabled);
  [...formFilter.children].forEach((child) => child.disabled = isDisabled);
};

export { setFormState };
