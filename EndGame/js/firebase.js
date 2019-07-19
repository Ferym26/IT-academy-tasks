firebase.initializeApp({
	apiKey: "AIzaSyBRsjWA7zAxd1ZwLCqiw9Z9qq1TX0hAt_U",
	authDomain: "meteorfall1661.firebaseapp.com",
	databaseURL: "https://meteorfall1661.firebaseio.com",
	projectId: "meteorfall1661",
	storageBucket: "",
	messagingSenderId: "42180231700",
	appId: "1:42180231700:web:132a7e9d1b0b8508"
});

const DB = firebase.database();

class DBStorage {
	constructor(settings) {
		this.key = settings.key;
	}
	// получает базу игроков
	getPlayers() {
		let _this = this;
		DB.ref(`${_this.key}/`)
			.once("value", function(snapshot) {
				console.log(snapshot.val());
				return snapshot.val();
			},
			function (error) {
				console.log("Error: " + error.code);
			}
		);
	}
	// добавляет в базу игрок/результат
	addPlayer(name, result) {
		let _this = this;
		let formatName = name.replace(/\s/g, "").toLowerCase();
		// проверка есть ли игрок в базе и сравнение текущего результата с базой
		DB.ref(`${_this.key}/${name}`)
			.once("value", function(snapshot) {
				if (result > snapshot.val()) {
					DB.ref(`${_this.key}/${formatName}`)
						.set(Math.round(result))
						.then(function (username) {
							console.log("Игрок добавлен на доску почета!");
						})
						.catch(function (error) {
							console.error("Ошибка добавления игрока: ", error);
					});
				}
				else {
					console.log("Этот результат меньше предыдущего, лошара))");
				}
			},
			function (error) {
				console.log("Error: " + error.code);
			}
		);
	}
	// очищает
	deletePlayer() {
		let _this = this;
		//
	}
}

let firebaseStorage = new DBStorage({
	key: 'players',
});

