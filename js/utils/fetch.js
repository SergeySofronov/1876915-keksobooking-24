const ACADEMY_GET_URL = 'https://24.javascript.pages.academy/keksobooking/data';
const ACADEMY_SEND_URL = 'https://24.javascript.pages.academy/keksobooking';

const getData = () => fetch(
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
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

const sentData = (logger, formData) => fetch(
  ACADEMY_SEND_URL,
  {
    method: 'POST',
    credentials: 'same-origin',
    body: new FormData(formData),
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    logger(data);
  })
  .catch((err) => {
    logger(err + ' Жопа!');
  });

export { getData, sentData };
