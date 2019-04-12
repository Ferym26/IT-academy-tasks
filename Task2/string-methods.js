//charAt() - oтдаёт символ под заданным индексом i.
"Foo".charAt(0);
"Bar".charAt(1);

//charCodeAt() - Отдаёт код символа под индексом i, т.е. Unicode 16-битное целое число, представляющее символ
"Foo".charCodeAt(0);
"Bar".charCodeAt(1);

//concat() - Объединяет текущую строку со строкой, переданной как аргумент.
"Foo".concat(" ").concat("Bar");

//endsWith() - Проверяет заканчивается ли строка со значением другой строки str.
let str = "JavaScript";
str.endsWith('Script'); //true
str.endsWith('script'); //false

//includes() - Проверяет есть ли в строке значение строки, передаваемой аргументом.
str.includes("Script"); //true
str.includes("script"); //false
str.includes("JavaScript"); //true

const garage = ["BMW", "Volvo", "Audi", "Mercedes"];
garage.includes("Volvo"); //true
garage.includes("Renault"); //false
garage.includes("BMW"); //true

//indexOf() - Даёт позицию начала заданной строки в той строке, на которой применяется метод. Возвращает -1, если поисковая строка не найдена.
str.indexOf('Script'); //4
str.indexOf('JavaScript'); //0
str.indexOf('aSc'); //3
str.indexOf('Ruby'); //-1

//lastIndexOf() - Даёт позицию последнего появления строки str в актуальной строке. Возвращает -1, если поисковая строка не найдена.
"JavaScript is a great language. Yes I mean JavaScript".lastIndexOf("Script"); //47
"JavaScript".lastIndexOf("Python"); //-1

//repeat() - Этот метод был представлен в ES2015 и повторяет строки заданное количество раз.
"Ха".repeat(3);

//replace() - Этот метод находит первое упоминание str1 в заданной строке и заменяет его на str2. Возвращает новую строку, не трогая оригинальную.
str.replace("Java", "Type"); //'TypeScript'

// slice() - Отдает новую строку, которая является частью строки на которой применялся метод, от позиций begin до end. Оригинальная строка не изменяется.
let str2 = "This is my car";
str2.slice(5); //is my car
str2.slice(5, 10); //is my
str2.slice(-6) //my car
str2.slice(-6, -4) //my

//split() - Этот метод вырезает строку при её нахождении в строке на которой применяется метод (чувствительный к регистру) и отдаёт массив с токенами.
let phrase = "I love my dog! Dogs are great";
let chunks = phrase.split("dog");
let words = phrase.split(" ");

console.log(chunks);
console.log(words);

//join() - Этот метод объединяет массив в строку
let phraseAgain = words.join(" ");
console.log(phraseAgain + '!!!');

//trim(), trimEnd(), trimStart() - возвращает новую строку удаляя пробелы вначале и в конце, или только в начале, ии только в конце оригинальной строки.
console.log("    test.  ".trim());

//some() - Этот метод проверяет есть ли нужные элементы в массиве и возвращает true и false. Это очень похоже по концепции на метод includes(), за исключением того, что аргументом является функция, а не строка.
const ages = [15, 16, 17, 18, 19, 20, 21];
ages.some(person => person >= 18);

//every() - Этот метод проходится по массиву, проверяет элемент и возвращает true или false.
ages.every(person => person >= 18);

//filter() - Этот метод создаёт новый массив из элементов, которые соответствуют условиям.
const prices = [40, 55, 32, 80, 15, 25];
let expensive = prices.filter(price => price >= 40);
console.log(expensive);

// map() - Этот метод схож с filter() в плане выдачи нового массива. Однако, разница тут в том, что он используется только для изменения элементов.
let sale = prices.map(price => price*0.8);
console.log(sale);

//reduce() - этот метод сокращает(от reduce — сокращать, но на самом деле складывает) весь массив в одно целое значение.
// для каждого элемента массива запустить функцию, промежуточный результат передавать первым аргументом далее
const arr = [1, 1, 2, 3, 5];

let result = arr.reduce(
    (sum, current, index) => {
    console.log(`${index}: sum = ${sum}, current = ${current}`);
    return sum + current
  }
    , 8);

console.log(result);

//concat() - метод объединения не только строк, но и массивов
let arr1 = [1, 2];
// соединяем arr1 с [3,4]
console.log(arr1.concat([3, 4]));
//соединяем arr c [3, 4] и [5, 6]
console.log(arr1.concat( [3, 5], [5, 6])); // 1, 2, 3, 4, 5, 6


//Более подробно можно почитать по ссылкам ниже:
//http://learn.javascript.ru/array-methods
//http://learn.javascript.ru/array-iteration
//http://learn.javascript.ru/object-for-in



