const MeteorFall = (function () {

	// глобальные настройки
	let settings = {
		name: null,
		canvas: document.querySelector('.js_game'),
		ctx: document.querySelector('.js_game').getContext('2d'),
		buffer: document.createElement("canvas").getContext("2d"), //TODO: сделать буферизацию графики
		width: window.innerWidth,
		height: window.innerHeight,
		meteorsArr: [], // массви всех метеоров
		meteorsNum: 10, // начальное кол-во метеоров

		userPoints: 0, // очки набранные юзером
		diffLvl: 1, // начальный уровень сложности
		diffInterval: 10, //секунды
		increaseDiffLVLCounter: null, //счетчик увеличения слоности

		globalRender: null, // счетчик глобального рендера
	};

	// установка пукнтов настроек
	// let _setSettings = function (userSettings) {
	// 	settings.name = userSettings.name;
	// };

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
			this.hitPoints = 100;

			this.drow();
			this.fly();
		}
		// отрисовка корабля
		drow() {
			let _this = this;
			this.shipPic = new Image();
			this.shipPic.src = 'img/ship1.png';
			this.shipPic.addEventListener("load", function() {
				_this.globalSettings.ctx.drawImage(_this.shipPic, (_this.globalSettings.width / 2) - (_this.size / 2), _this.globalSettings.height - 100, _this.size, _this.size);
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
		// TODO: огонь двигателя при полете
		flame() {
			let _this = this;
		}
		// TODO: поворот корабля при перемещении
		rotate() {
			let _this = this;
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
			this.size = settings.size;
			this.meteorPic = null;
			this.dropSpeed = settings.dropSpeed;
			this.lvl = null; // уровень метеорита

			this.setLVL();
			this.drow();
		}
		// отрисовка метеорита
		drow() {
			let _this = this;
			this.meteorPic = new Image();
			this.meteorPic.src = 'img/meteor4.png';
			this.meteorPic.addEventListener("load", function() {
				_this.globalSettings.ctx.drawImage(_this.meteorPic, _this.posX, _this.posY, _this.size, _this.size);
			}, false);
		}
		// перемешение метеритов
		update() {
			let _this = this;
			this.posY += this.dropSpeed;
			if (this.posY > this.globalSettings.height) {
				this.posX = Math.floor(Math.random() * this.globalSettings.width);
				this.posY = -Math.floor(Math.random() * this.globalSettings.height);
				this.flyAway();
			}
			_this.globalSettings.ctx.drawImage(_this.meteorPic, _this.posX, _this.posY, _this.size, _this.size);
		}
		// расчет уровня метеорита
		setLVL() {
			switch (true) {
				case (this.size >= 40 && this.size < 60):
					this.lvl = 1;
					break;
				case (this.size >= 60 && this.size < 80):
					this.lvl = 2;
					break;
				case (this.size >= 80 && this.size <= 100):
					this.lvl = 3;
					break;
				default:
					this.lvl = 1;
					break;
			}
		}
		// событие успешного пересечения метеоритои игрового поля
		flyAway() {
			model.calcUserPoints(this.lvl, this.dropSpeed);
		}
	}

	// класс фоновой картинки
	class Background {
		constructor(settings) {
			this.globalSettings = settings.globalSettings; //прокидываение в класс глобальных настроек
			this.pic = settings.pic;
			this.posX = 0;
			this.posY = 0;
			this.speed = settings.speed;

			this.drow();
		}
		// отрисовка фона
		drow() {
			let _this = this;
			this.bgPic1 = new Image();
			this.bgPic2 = new Image();
			this.bgPic1.src = `img/space2.png`;
			this.bgPic2.src = this.bgPic1.src;
			this.bgPic1.addEventListener("load", function() {
				_this.globalSettings.ctx.drawImage(_this.bgPic1, _this.posX, _this.posY, _this.globalSettings.width, _this.globalSettings.height);
				_this.globalSettings.ctx.drawImage(_this.bgPic2, _this.posX, _this.posY - _this.globalSettings.height, _this.globalSettings.width, _this.globalSettings.height);
			}, false);
		}
		// обновление позиции фона
		update() {
			let _this = this;
			this.posY += this.speed;
			if (this.posY > _this.globalSettings.height) {
				this.posY = 0;
			}
			_this.globalSettings.ctx.drawImage(_this.bgPic1, _this.posX, _this.posY, _this.globalSettings.width, _this.globalSettings.height);
			_this.globalSettings.ctx.drawImage(_this.bgPic2, _this.posX, _this.posY - _this.globalSettings.height, _this.globalSettings.width, _this.globalSettings.height);
		}
	}

	// TODO: класс летящих фоновых частичек
	class Particle {
		constructor(settings) {
			this.globalSettings = settings.globalSettings; //прокидываение в класс глобальных настроек

			this.drow();
		}
		drow() {
			let _this = this;
		}
		update() {
			let _this = this;
		}
	}

	// MODEL
	let model = {
		// Запуск цикла отрисовки
		startDrow: function() {
			view.drow();
		},
		// создание массива метеоритов
		spawnMeteors: function(num) {
			for(let i = 0; i <= num - 1; i++) {
				settings.meteorsArr[i] = new Meteor({
					globalSettings: settings,
					size: _random(40, 100),
					dropSpeed: _random(2, 7),
				})
			}
		},
		// инит корабля
		addShip: function() {
			this.playerShip = new Ship({
				globalSettings: settings,
				size: 65,
			});
		},
		// инит фона
		addBackground: function() {
			this.background = new Background({
				globalSettings: settings,
				pic: 'space2.png',
				speed: 0.3,
			});
		},
		// добавление нового метеорита в массив
		addMeteor: function() {
			settings.meteorsArr.push(new Meteor({
				globalSettings: settings,
				size: _random(40, 100),
				dropSpeed: _random(2, 7),
			}))
		},
		//Обработка столкновения корабля и метеорита
		collision: function() {
			for (var i = 0; i < settings.meteorsArr.length; i++) {

				let shipFront = model.playerShip.posY;
				let shipBack = model.playerShip.posY + model.playerShip.size;
				let shipLeft = model.playerShip.posX;
				let shipRight = model.playerShip.posX + model.playerShip.size;
				
				let meteorFront = settings.meteorsArr[i].posY;
				let meteorBack = settings.meteorsArr[i].posY + settings.meteorsArr[i].size;
				let meteorLeft = settings.meteorsArr[i].posX;
				let meteorRight = settings.meteorsArr[i].posX + settings.meteorsArr[i].size;
				
				if (shipFront <= meteorBack && shipBack >= meteorFront && shipLeft <= meteorRight && shipRight >= meteorLeft) {
					settings.meteorsArr[i].posX = Math.floor(Math.random() * settings.width);
					settings.meteorsArr[i].posY = -Math.floor(Math.random() * settings.height);
					this.clash(settings.meteorsArr[i].lvl);
				}
			}
		},
		// Удар метеорита о корабль
		clash: function(meteorLVL) {
			switch (meteorLVL) {
				case 1:
					model.playerShip.hitPoints -= 6;
					break;
				case 2:
					model.playerShip.hitPoints -= 8;
					break;
				case 3:
					model.playerShip.hitPoints -= 10;
					break;
				default:
					model.playerShip.hitPoints -= 6;
					break;
			}
			
			if (model.playerShip.hitPoints > 0) {
				view.setUIHitPoint(model.playerShip.hitPoints);
			}
			else {
				view.setUIHitPoint(0);
				this.stopGame();
			}
		},
		
		// Устанавливает имя игрока
		showUIUserName: function() {
			view.showUIUserName(settings.name);
		},
		// остановка рендера игры
		stopGame: function() {
			cancelAnimationFrame(settings.globalRender);
			clearInterval(settings.increaseDiffLVLCounter);
			view.openResultModal();

			DB.ref('players/' + `${settings.name.replace(/\s/g, "").toLowerCase()}`).set(Math.round(settings.userPoints))
			.then(function (username) {
				console.log("Пользователь добавлен в коллецию users");
			})
			.catch(function (error) {
				console.error("Ошибка добавления пользователя: ", error);
			});

		},
		// увеличение уровня сложности
		increaseDiffLVL: function() {
			settings.increaseDiffLVLCounter = setInterval(() => {
				settings.diffLvl += 1;
				model.addMeteor();
				view.setUIDiffLVL();
			}, settings.diffInterval * 1000)
		},
		// подсчет очков
		calcUserPoints: function(meteorLVL, meteorSpeed) {
			settings.userPoints += 1 + ((meteorLVL * meteorSpeed / 10) * (settings.diffLvl / 3));
			view.setUIPoints();
		},
		// показывает панель игрока
		showUIPanel: function() {
			view.showUIPanel();
		},
		// показывает прогресс до начала игры
		showStartProgress: function() {
			view.showStartProgress();
		},
		runStartProgress: function(bar) {
			let width = 1;
			let loop = setInterval(frame, 30);
			function frame() {
				if (width >= 100) {
					clearInterval(loop);
					controller.uiElement.modalGameStart.modal('hide');
					model.startDrow();
					model.increaseDiffLVL();
				}
				else {
					width++;
					bar.style.width = width + '%';
				}
			}
		}
	}

	// VIEW
	let view = {
		// очистка области
		clear: function() {
			settings.ctx.clearRect(0, 0, settings.width, settings.height);
		},
		// отрисовка
		drow: function() {
			let _this = this;
			settings.canvas.width = settings.width;
			settings.canvas.height = settings.height;

			model.addBackground();
			model.addShip();
			model.spawnMeteors(settings.meteorsNum);

			// цикл отрисовки
			function loop() {
				settings.globalRender = requestAnimationFrame(loop);
				view.clear();
				model.background.update();
				model.playerShip.update();
				settings.meteorsArr.forEach((item, i) => {
					item.update();
				});
				model.collision();
			};
			loop();
		},
		// Устанавливает имя игрока
		showUIUserName: function(userName) {
			let userNameBlock = document.querySelector('.game-panel__username span');
			userNameBlock.innerHTML = userName;
		},
		// Отображает значение прочности корабля
		setUIHitPoint: function(points) {
			let durabilityBlock = document.querySelector('.game-panel__durability span');
			durabilityBlock.innerHTML = points;
		},
		// Отображает значение уровня сложности
		setUIDiffLVL: function() {
			let diffLVLBlock = document.querySelector('.game-panel__lvl span');
			diffLVLBlock.innerHTML = settings.diffLvl;
		},
		// Отображает кол-во набраных очков
		setUIPoints: function() {
			let scoreBlock = document.querySelector('.game-panel__score span');
			scoreBlock.innerHTML = Math.round(settings.userPoints);
		},
		// Отображает модалку с результатами
		openResultModal: function() {
			$('#gameOverModal').modal('show');
		},
		// Отображает UI панель
		showUIPanel: function() {
			let uiPanel = document.querySelector('.game-panel');
			uiPanel.style.display = 'block';
		},
		// показывает прогресс до начала игры
		showStartProgress: function() {
			let btnStart = document.querySelector('.js_start-game');
			let progressWrap = document.querySelector('.progress');
			let progressBar = progressWrap.querySelector('.progress-bar');
			btnStart.style.display = "none";
			progressWrap.style.display = "flex";
			model.runStartProgress(progressBar);
		}

	};

	// CONTROLLER
	let controller = {
		uiElement: {
			inputName: document.querySelector('.js_input-name'),
			btnStart: document.querySelector('.js_start-game'),
			btnAddUserName: document.querySelector('.js_add-userName'),
			modalGameStart: $('#gameStart'),
		},
		events: function () {
			controller.uiElement.modalGameStart.modal('show');
			controller.uiElement.btnStart.addEventListener('click', controller.startGame);
			controller.uiElement.btnAddUserName.addEventListener('click', controller.addUserName);
		},
		addUserName: function(e) {
			e.preventDefault();
			if (!!controller.uiElement.inputName.value) {
				settings.name = controller.uiElement.inputName.value;
				controller.uiElement.btnStart.removeAttribute('disabled');
				model.showUIPanel();
				model.showUIUserName();
			}
			else {
				alert('Введите имя');
			}
			

		},
		startGame: function(e) {
			e.preventDefault();
			model.showStartProgress();
		},
	};

	let app = {
		init: function (userSettings) {
			// _setSettings(userSettings);
			controller.events();
		},
	}

	return app;

})();

MeteorFall.init();