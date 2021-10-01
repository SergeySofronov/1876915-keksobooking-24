//Функция getRandomInt, возвращающая случайное целое число из переданного диапазона включительно.
function getRandomInt(lowerBound, upperBound) {
  return Math.floor(lowerBound + Math.random() * (upperBound - lowerBound + 1));
}

/*Функция getRandomFloat, возвращающая случайное дробное число из переданного диапазона.
Включение верхней границы диапазона зависит от Math.random() и округления операции сложения.*/
function getRandomFloat(lowerBound, upperBound) {
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

/*Функция getRandomFloat, возвращающая случайное дробное число из переданного диапазона включительно.
Значение параметра valueAfterComma определяет количество знаков после запятой.*/
function getRandomFloatStrict(lowerBound, upperBound, valueAfterComma) {
  return Number((getRandomFloat(lowerBound, upperBound) + 1 / Math.pow(10, valueAfterComma + 1)).toFixed(valueAfterComma));
}

/*Функция getRandomFloat2, возвращающая случайное целое или дробное число из переданного диапазона включительно
с возможностью ограничения количества знаков после запятой.
*/
function getRandomFromRange(lowerBound, upperBound, isFloating, valueAfterComma) {
  const maxValue = Math.max(lowerBound, upperBound);
  const minValue = Math.min(lowerBound, upperBound);

  if (~Math.sign(lowerBound | upperBound | isFloating)) {
    if (!isFloating) {
      return getRandomInt(minValue, maxValue);
    } else if (!Number.isInteger(valueAfterComma)) {
      return getRandomFloat(minValue, maxValue);
    } else {
      return getRandomFloatStrict(minValue, maxValue, valueAfterComma);
    }
  }
  return 'error: attribute negative';
}

getRandomFromRange(5, 15, true, 5);
