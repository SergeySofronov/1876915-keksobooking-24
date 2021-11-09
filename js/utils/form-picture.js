const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';
const FILE_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_PICTURES_NUMBER = 3;
const AVATAR_PICTURE_CLASS = 'ad-form-header__img';

//Селекторы тэгов загрузки файлов и превью
const avatarPictureContainer = document.querySelector('.ad-form-header__upload');
const avatarPicturePicker = avatarPictureContainer.querySelector('#avatar');
const avatarPicturePreview = avatarPictureContainer.querySelector('img');
const housePictureContainer = document.querySelector('.ad-form__photo-container');
const housePicturePicker = housePictureContainer.querySelector('#images');
const housePicturePreview = housePictureContainer.querySelector('.ad-form__photo');

//Сброс загруженных файлов к значениям по умолчанию
const resetPicture = () => {
  avatarPicturePreview.classList.remove(AVATAR_PICTURE_CLASS);
  avatarPicturePreview.src = DEFAULT_AVATAR_IMAGE;
  housePicturePreview.innerHTML = '';
};

//Событие выбора аватарки пользователя
const onAvatarPictureChange = () => {
  const file = avatarPicturePicker.files[0];
  const filetype = file.type;
  const isValidType = FILE_TYPES.some((value) => value === filetype);
  if (isValidType) {
    avatarPicturePreview.src = URL.createObjectURL(file);
    if (!avatarPicturePreview.classList.contains(AVATAR_PICTURE_CLASS)) {
      avatarPicturePreview.classList.add(AVATAR_PICTURE_CLASS);
    }
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
  files.forEach((item) => {
    const filetype = item.type;
    const isValidType = FILE_TYPES.some((value) => value === filetype);
    if (isValidType) {
      const newPicture = document.createElement('img');
      newPicture.src = URL.createObjectURL(item);
      housePicturePreview.appendChild(newPicture);
    }
  });
};
housePicturePicker.addEventListener('change', onHousePictureChange);

export { resetPicture };
