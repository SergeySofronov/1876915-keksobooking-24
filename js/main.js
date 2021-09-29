/*Функция getRandomInt, возвращающая случайное целое число из переданного диапазона включительно.
Перестановка firstBound/secondBound значения не имеет. По условию "диапазон может быть только положительный,
включая ноль", поэтому проверок нет. При firstBound==secondBound выводит их значение.*/
function getRandomInt(firstBound, secondBound) {
  if (firstBound < secondBound) {
    return Math.floor(firstBound + Math.random() * (secondBound - firstBound + 1));
  }
  return Math.floor(secondBound + Math.random() * (firstBound - secondBound + 1));
}

/*Функция getRandomFloat, возвращающая случайное дробное число из переданного диапазона включительно.
Выводит значения условно из [0, 1). Округление до границы зависит от Math.random() и мат. операций.
При firstBound==secondBound выводит их значение.
*/
function getRandomFloat(firstBound, secondBound) {
  const minValue = firstBound < secondBound ? firstBound : secondBound;
  return Math.random() * Math.abs(secondBound - firstBound) + minValue;
}

/*Функция getRandomFloat2, возвращающая случайное дробное число из переданного диапазона включительно.
Для вывода условно из [0, 1]  к результату добавляется дробная часть 1/Math.pow(10, valueAfterComma + 1),
которая затем отсекается toFixed до valueAfterComma. Но есть артефакт, например при вводе [-1,0]
на выходе бывают значения -0. При firstBound==secondBound выводит их значение.
*/
function getRandomFloat2(firstBound, secondBound, valueAfterComma) {
  let result = 0;
  const minValue = firstBound < secondBound ? firstBound : secondBound;
  result = Math.random() * Math.abs(secondBound - firstBound) + minValue;
  result += 1 / Math.pow(10, valueAfterComma + 1);
  return Number(result.toFixed(valueAfterComma));
}

getRandomInt(10, 100);
getRandomFloat(2.5, 5.5);
getRandomFloat2(10, 100, 5);

//P.s. Можно еще проверку на Infinite сделать.
