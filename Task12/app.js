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

		this.drow();
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
		let _self = this;
		this.ballX += this.ballSpeedX;
		this.ballY += this.ballSpeedY;
	}

	// проверка взаимодействий
	collisions() {
		// проверка удара о правую стенку
		if(this.ballX + this.ballSize >= OPTS.WIDTH) {
			this.scoring();
		}
		// проверка удара о левую стенку
		if(this.ballX - this.ballSize <= 0) {
			this.scoring();
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
				console.log('bam left');
			}
		}
		// проверка удара о правую рокетку
		if(this.ballX + (this.ballSize) >= OPTS.WIDTH - this.playerLeft.width) {
			// console.log('возможен удар справа');
			if(this.ballY > this.playerRight.posY && this.ballY < this.playerRight.posY + this.playerRight.height) {
				this.ballSpeedX = -this.ballSpeedX;
				console.log('bam left');
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
		// рисуем поле
		OPTS.CANVAS.width = OPTS.WIDTH;
		OPTS.CANVAS.height = OPTS.HEIGHT;

		// рисуем рокетки
		this.raquets();

		let loop = () => {
			this.clear();
			this.ball();
			this.playerLeft.drow();
			this.playerRight.drow();
			this.update();
			this.collisions();

			window.requestAnimationFrame(loop);
		}

		window.requestAnimationFrame(loop);
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
		let _self = this;

		document.addEventListener("keydown", repos);
		function repos(e) {
			switch(e.keyCode) {
				case (_self.keyUp):
					_self.posY -= 3;
					break;
				case (_self.keyDown):
					_self.posY += 3;
					break;
			}
			if (_self.posY <= 0) {
				_self.posY = 0;
			}
			if (_self.posY >= OPTS.HEIGHT - (_self.height)) {
				_self.posY = OPTS.HEIGHT - (_self.height)
			}
		}
	}
}

let fieldTennis = new Tennis({});