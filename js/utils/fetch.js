const ACADEMY_GET_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const ACADEMY_SEND_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => fetch(
  ACADEMY_GET_URL,
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((userAdsData) => {
    onSuccess(userAdsData);
  })
  .catch((err) => {
    onFail(err);
  });

const sendData = (onSuccess, onFail, formData) => fetch(
  ACADEMY_SEND_URL,
  {
    method: 'POST',
    credentials: 'same-origin',
    body: new FormData(formData),
  },
)
  .then((response) => {
    if (response.ok) {
      onSuccess();  // Отправка произведена успешно
    } else {
      onFail();   // Ошибка при отправке
    }
  })
  .catch(() => {
    onFail();   // Ошибка при отправке
  });

export { getData, sendData };
