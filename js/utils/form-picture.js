const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';
const FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_PICTURES_NUMBER = 3;
const AVATAR_PICTURE_CLASS = 'ad-form-header__img';
const FILE_TYPE_ERROR = 'Wrong file type';

//Селекторы тэгов загрузки файлов и превью
const avatarPictureContainer = document.querySelector('.ad-form-header__upload');
const avatarPicturePicker = avatarPictureContainer.querySelector('#avatar');
const avatarPicturePreview = avatarPictureContainer.querySelector('img');
const housePictureContainer = document.querySelector('.ad-form__photo-container');
const housePicturePicker = housePictureContainer.querySelector('#images');
const housePicturePreview = housePictureContainer.querySelector('.ad-form__photo');

//Сброс загруженных файлов к значениям по умолчанию
const resetPicture = () => {
  housePicturePreview.innerHTML = '';
  if (avatarPicturePreview.hidden) {
    avatarPictureContainer.firstElementChild.firstChild.remove();
    avatarPicturePreview.hidden = false;
  }
  avatarPicturePreview.classList.remove(AVATAR_PICTURE_CLASS);
  avatarPicturePreview.src = DEFAULT_AVATAR_IMAGE;

};

//Проверка валидности файла
const checkFileValidity = (file) => FILE_TYPES.some((value) => value === file.type);

//Событие выбора аватарки пользователя
const onAvatarPictureChange = () => {
  const file = avatarPicturePicker.files[0];
  if (checkFileValidity(file)) {
    avatarPicturePreview.src = URL.createObjectURL(file);
    if (!avatarPicturePreview.classList.contains(AVATAR_PICTURE_CLASS)) {
      avatarPicturePreview.classList.add(AVATAR_PICTURE_CLASS);
    }
  } else {
    avatarPicturePreview.hidden = true;
    avatarPictureContainer.firstElementChild.insertAdjacentText('afterbegin', FILE_TYPE_ERROR);
    avatarPicturePicker.value = '';
  }
};
avatarPicturePicker.addEventListener('change', onAvatarPictureChange);

//Событие выбора фото жилья
const onHousePictureChange = () => {
  housePicturePreview.innerHTML = '';
  const files = [...housePicturePicker.files];
  if (files.length > MAX_PICTURES_NUMBER) {
    files.length = MAX_PICTURES_NUMBER;
  }
  files.forEach((file) => {
    if (checkFileValidity(file)) {
      const newPicture = document.createElement('img');
      newPicture.src = URL.createObjectURL(file);
      housePicturePreview.appendChild(newPicture);
    } else {
      housePicturePreview.textContent = FILE_TYPE_ERROR;
      housePicturePicker.value = '';
    }
  });
};
housePicturePicker.addEventListener('change', onHousePictureChange);

export { resetPicture };
