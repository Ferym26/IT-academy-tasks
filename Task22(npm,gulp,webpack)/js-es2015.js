//новые переменные
const summ = (x, y) => {
	return x + y;
};
let simple = a => a > 15 ? 15 : a;
//строки-шаблоны
let apples = 2;
let oranges = 3;
alert(`${apples} + ${oranges} = ${apples + oranges}`);

let getTime = () => {
	let date = new Date();
	return date.getHours() + ':' + date.getMinutes();
};

alert(getTime()); // текущее время

//вычисляемые св-ва
let propName = "firstName";

let user = {
	[propName]: "Вася"
};

alert(user.firstName); // Вася

//пример деструктуризации
let options = {
	title: "Меню",
	width: 100,
	height: 200
};

const showMenu = ({
	title,
	width,
	height
}) => {
	alert(title + ' ' + width + ' ' + height); // Меню 100 200
}

showMenu(options);

//функция в блоке не видна извне
if (true) {

	sayHi();

	function sayHi() {
		alert("Привет!");
	}

}

sayHi();

//spread operator
const showName = (firstName, lastName, ...rest) => {
	alert(firstName + ' ' + lastName + ' - ' + rest);
}

// выведет: Юлий Цезарь - Император,Рима
showName("Юлий", "Цезарь", "Император", "Рима");


// создание классов
class User2 {

	constructor(name) {
		this.name = name;
	}

	sayHi() {
		alert(this.name);
	}

}

let user2 = new User2("Вася");
user.sayHi(); // Вася