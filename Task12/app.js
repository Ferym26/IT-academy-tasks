const OPTS = {
	CANVAS: document.querySelector('.play-field'),
	CTX: document.querySelector('.play-field').getContext('2d'),
	WIDTH: 500,
	HEIGHT: 300,
}

class Tennis {

	constructor(opt) {
		this.ballX = OPTS.WIDTH / 2;
		this.ballY = OPTS.HEIGHT / 2;
		this.ballSize = 15;
		this.ballSpeedX = 3;
		this.ballSpeedY = 0;

		this.board = OPTS.CANVAS.previousElementSibling;
		this.leftPlayerScore = this.board.querySelector('.score-left');
		this.rightPlayerScore = this.board.querySelector('.score-right');
		this.leftPlayerNum = 0;
		this.rightPlayerNum = 0;

		this.startBtn = document.querySelector('.js_start'); // кнопка запуска игры
		this.playState = false; // запущена игра или нет

		this.drow();
		this.startGame();
	}

	// отрисовка мячика
	ball() {
		OPTS.CTX.fillStyle = 'red';
		OPTS.CTX.beginPath();
		OPTS.CTX.arc(this.ballX, this.ballY, this.ballSize, 0, 2 * Math.PI);
		OPTS.CTX.fill();
	}

	// инитим рокетки
	raquets() {

		this.playerLeft = new PlayerRacquet({
			side: 'left',
			color: 'blue',
			keyUp: 87,
			keyDown: 83
		});

		this.playerRight = new PlayerRacquet({
			side: 'right',
			color: 'green',
			keyUp: 38,
			keyDown: 40
		});
	}

	// обновление параметров
	update() {
		let _this = this;

		// перемещение мячика
		this.ballX += this.ballSpeedX;
		this.ballY += this.ballSpeedY;
	}

	// проверка взаимодействий
	collisions() {
		// проверка удара о правую стенку
		if(this.ballX + this.ballSize >= OPTS.WIDTH) {
			this.scoring();
			this.stopGame();
		}
		// проверка удара о левую стенку
		if(this.ballX - this.ballSize <= 0) {
			this.scoring();
			this.stopGame();
		}
		// проверка удара о нижнюю стенку
		if(this.ballY + this.ballSize >= OPTS.HEIGHT) {
			this.ballSpeedY = -this.ballSpeedY;
		}
		// проверка удара о верхнюю стенку
		if(this.ballY - this.ballSize <= 0) {
			this.ballSpeedY = -this.ballSpeedY;
		}

		// проверка удара о левую рокетку
		if(this.ballX - (this.ballSize) <= this.playerLeft.width) {
			// console.log('возможен удар слева');
			if(this.ballY > this.playerLeft.posY && this.ballY < this.playerLeft.posY + this.playerLeft.height) {
				this.ballSpeedX = -this.ballSpeedX;
				// console.log('bam left');
			}
		}
		// проверка удара о правую рокетку
		if(this.ballX + (this.ballSize) >= OPTS.WIDTH - this.playerLeft.width) {
			// console.log('возможен удар справа');
			if(this.ballY > this.playerRight.posY && this.ballY < this.playerRight.posY + this.playerRight.height) {
				this.ballSpeedX = -this.ballSpeedX;
				// console.log('bam right');
			}
		}
	}

	// подсчет очков
	scoring() {
		if (this.ballX + this.ballSize >= OPTS.WIDTH) {
			this.leftPlayerNum++;
			this.leftPlayerScore.innerHTML = this.leftPlayerNum;
		}
		if (this.ballX - this.ballSize <= 0) {
			this.rightPlayerNum++;
			this.rightPlayerScore.innerHTML = this.rightPlayerNum;
		}
	}

	// очистка области
	clear() {
		OPTS.CTX.clearRect(0, 0, OPTS.WIDTH, OPTS.HEIGHT);
	}

	//отрисовка
	drow() {
		// TODO: добавить проверку playState
		let _this = this;
		// рисуем поле
		OPTS.CANVAS.width = OPTS.WIDTH;
		OPTS.CANVAS.height = OPTS.HEIGHT;

		// Первоначальная отрисовка элементов до старта
		this.ball();
		this.raquets();
		this.playerLeft.drow();
		this.playerRight.drow();


		// цикл отрисовки
		this.loop = () => {
			_this.clear();
			_this.ball();
			_this.playerLeft.drow();
			_this.playerRight.drow();
			_this.update();
			_this.collisions();

			_this.globalRender = window.requestAnimationFrame(_this.loop);
		}
	}

	// запуск игры
	startGame() {
		let _this = this;

		this.startBtn.addEventListener("click", function () {
			if (_this.playState == false) {
				window.requestAnimationFrame(_this.loop);
			}
			_this.playState = true;
		});
	}

	// остановка игры
	stopGame() {
		let _this = this;

		if (_this.playState) {
			window.cancelAnimationFrame(_this.globalRender);
		}
		_this.playState = false;
	}
};

class PlayerRacquet {

	constructor(opt) {
		this.side = opt.side;
		this.color = opt.color;
		this.width = 10;
		this.height = 60;
		this.posY = (OPTS.HEIGHT / 2) - (this.height / 2);
		this.keyUp = opt.keyUp;
		this.keyDown = opt.keyDown;
		this.keys = [];

		this.move();
	}

	// рисует рокетку
	drow() {
		OPTS.CTX.fillStyle = this.color;

		if (this.side == 'left') {
			OPTS.CTX.fillRect(0, this.posY, this.width, this.height);
		}
		else if (this.side == 'right') {
			OPTS.CTX.fillRect(OPTS.WIDTH - this.width, this.posY, this.width, this.height);
		}
		else {
			console.error('Ошибка укания позиции игрока (введите left/right)');
		}
	}

	// двигает рокетку
	move() {
		let _this = this;
		document.body.addEventListener("keydown", repos);
		
		function repos(e) {
			switch(e.keyCode) {
				case (_this.keyUp):
					_this.posY -= 3;
					break;
				case (_this.keyDown):
					_this.posY += 3;
					break;
			}

			if (_this.posY <= 0) {
				_this.posY = 0;
			}
			if (_this.posY >= OPTS.HEIGHT - (_this.height)) {
				_this.posY = OPTS.HEIGHT - (_this.height)
			}
		}
	}
}

let fieldTennis = new Tennis({});