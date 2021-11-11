const ACADEMY_BASE_URL = 'https://24.javascript.pages.academy/keksobooking';

const EndPoints = {
  SEND_ADS: `${ACADEMY_BASE_URL}`,
  GET_ADS: `${ACADEMY_BASE_URL}/data`,
};

//Загрузка данных от сервера
const getData = (onSuccess, onFail, onFinally) => fetch(
  EndPoints.GET_ADS,
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
  })
  .finally(onFinally);

//Отправка данных на сервер
const sendData = (onSuccess, onFail, formData) => fetch(
  EndPoints.SEND_ADS,
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
  .catch(onFail);   // Ошибка при отправке

export { getData, sendData };
