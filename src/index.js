module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const bracketsMap = new Map(bracketsConfig.map(([open, close]) => [open, close]));

  for (let char of str) {
      // Если текущий символ является открывающей скобкой
      if (bracketsMap.has(char)) {
          // Специальный случай: открывающая и закрывающая скобки одинаковы
          if (bracketsMap.get(char) === char && stack.length > 0 && stack[stack.length - 1] === char) {
              stack.pop(); // удаляем из стека
          } else {
              stack.push(char); // добавляем в стек
          }
      } else { // Если текущий символ является закрывающей скобкой
          const last = stack.pop(); // извлекаем верхний элемент из стека
          // Проверяем, соответствует ли он закрывающей скобке
          if (!last || bracketsMap.get(last) !== char) {
              return false; // неправильная последовательность
          }
      }
  }

  // Если стек пуст, последовательность корректная
  return stack.length === 0;
}