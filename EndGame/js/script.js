const MeteorFall = (function () {

	// глобальные настройки
	let settings = {
		name: 'default name',
		canvas: document.querySelector('.js_game'),
		ctx: document.querySelector('.js_game').getContext('2d'),
		width: window.innerWidth,
		height: window.innerHeight,
		meteorsArr: [],
		meteorsNum: 2,
	};

	// установка пукнтов настроек
	let _setSettings = function (userSettings) {
		settings.name = userSettings.name;
	};

	// возвращает рандомное число от min до max включительно
	let _random = function getRandomInt(min, max) {
		return Math.round(Math.random() * (max - min)) + min;
	}

	// класс корабля
	class Ship {
		constructor(settings) {
			this.globalSettings = settings.globalSettings; //прокидываение в класс глобальных настроек
			this.size = settings.size;
			this.posX = null || this.globalSettings.width / 2;
			this.posY = null || this.globalSettings.height - 100;

			this.drow();
			this.fly();
		}
		// отрисовка корабля
		drow() {
			let _this = this;
			this.shipPic = new Image();
			this.shipPic.src = 'img/ship1.png';
			this.shipPic.addEventListener("load", function() {
				_this.globalSettings.ctx.drawImage(_this.shipPic, _this.globalSettings.width / 2, _this.globalSettings.height - 100, _this.size, _this.size);
			}, false);
		}
		// перемещение корабля
		fly() {
			let _this = this;
			const setShipPos = (e) => {
				_this.posX = Math.round(e.pageX - (_this.size / 2));
				_this.posY = Math.round(e.pageY - (_this.size / 2));
			}
			document.addEventListener("mousemove", setShipPos, false);
		}
		// обновление позиции корабля
		// перерисовывает корабль на стартовых координатах перемещения мыши, далее на курсоре
		update() {
			let _this = this;
			_this.globalSettings.ctx.drawImage(_this.shipPic, _this.posX, _this.posY, _this.size, _this.size);
		} 
	}

	// класс метеорита
	class Meteor {
		constructor(settings) {
			this.globalSettings = settings.globalSettings; //прокидываение в класс глобальных настроек
			this.posX = Math.floor(Math.random() * this.globalSettings.width);
			this.posY = -Math.floor(Math.random() * this.globalSettings.height);
			this.width = settings.width;
			this.height = settings.height;
			this.meteorPic = null;

			this.drow();
		}
		// отрисовка метеорита
		drow() {
			let _this = this;
			this.meteorPic = new Image();
			this.meteorPic.src = 'img/meteor4.png';
			this.meteorPic.addEventListener("load", function() {
				_this.globalSettings.ctx.drawImage(_this.meteorPic, _this.posX, _this.posY, _this.width, _this.height);
			}, false);
		}
		// перемешение метеритов
		update() {
			let _this = this;
			this.posY += 4;
			if (this.posY > this.globalSettings.height) {
				this.posX = Math.floor(Math.random() * this.globalSettings.width);
				this.posY = -Math.floor(Math.random() * this.globalSettings.height);
			}
			_this.globalSettings.ctx.drawImage(_this.meteorPic, _this.posX, _this.posY, _this.width, _this.height);
		}
	}

	// MODEL
	let model = {
		// showName: function () {
		// 	console.log(settings.name);
		// }
		onload: function() {
			view.drow();
			setTimeout(() => {
				model.addMeteor();
			}, 3000)
		}, 
		// создание массива метеоритов
		spawnMeteors: function(num) {
			for(let i = 0; i <= num - 1; i++) {
				settings.meteorsArr[i] = new Meteor({
					globalSettings: settings,
					width: 80,
					height: 60
				})
			}
		},
		// добавление нового метеорита в массив
		addMeteor: function() {
			settings.meteorsArr.push(new Meteor({
				globalSettings: settings,
				width: 80,
				height: 60
			}))
		},
		//Обработка столкновения корабля и метеорита
		// TODO: остановился тут
		collision: function() {
			for (var i = 0; i < settings.meteorsArr.length; i++) {
				if (view.playerShip.posY < settings.meteorsArr[i].posY + settings.meteorsArr[i].size && view.playerShip.posX + view.playerShip.size > settings.meteorsArr[i].posX && view.playerShip.posX < settings.meteorsArr[i].posX + settings.meteorsArr[i].size) {
					settings.meteorsArr[i].posX = -Math.floor(Math.random() * settings.width);
					console.log('123');
				}
			}
		},
	}

	// VIEW
	let view = {
		// очистка области
		clear: function() {
			settings.ctx.clearRect(0, 0, settings.width, settings.height);
		},
		// отрисовка
		drow: function() {
			settings.canvas.width = settings.width;
			settings.canvas.height = settings.height;
			
			this.playerShip = new Ship({
				globalSettings: settings,
				size: 65,
			});

			model.spawnMeteors(settings.meteorsNum);

			// цикл отрисовки
			const loop = () => {
				view.clear();
				this.playerShip.update();
				settings.meteorsArr.forEach((item, i) => {
					item.update();
				})
				// if (_this.playState == 'play') {
				// 	window.requestAnimationFrame(_this.loop);
				// }
				window.requestAnimationFrame(loop);
			}
			loop();
		},
	};

	// CONTROLLER
	let controller = {
		events: function () {
			model.onload();
		},
	};

	let app = {
		init: function (userSettings) {
			_setSettings(userSettings);
			controller.events();
		},
	}

	return app;

})();

MeteorFall.init({
	name: 'Username',
});