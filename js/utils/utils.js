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
с возможностью ограничения количества знаков после запятой.*/
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
  throw new Error('getRandomFromRange: attribute negative');
}

/*Функция-генератор generateNonRepeatArray возвращает массив длиной arrayLength случайных не повторяющихся
целых чисел из диапазона от lowerBorder до upperBorder.*/
function getNonRepeatUintArray(lowerBorder, upperBorder, arrayLength) {
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let lower = Math.ceil(Math.min(Math.abs(lowerBorder), Math.abs(upperBorder)));
  const upper = Math.floor(Math.max(Math.abs(lowerBorder), Math.abs(upperBorder)));
  let totalNumbers = Math.abs(upper - lower) + 1;
  if (arrayLength && (totalNumbers >= arrayLength)) {
    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers + lower);
    }
    while (arrayTotalNumbers.length) {
      lower = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[lower]);
      arrayTotalNumbers.splice(lower, 1);
    }
    return arrayRandomNumbers;
  }
  throw new Error('generateNonRepeatArray: wrong attributes');
}

export { getRandomFromRange, getNonRepeatUintArray };