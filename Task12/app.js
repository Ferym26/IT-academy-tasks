class Tennis {

	constructor(opt) {
		this.canvas = opt.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.width = opt.width;
		this.height = opt.height;

		this.ballX = this.width / 2;
		this.ballY = this.height / 2;
		this.ballSize = 15;
		this.ballSpeedX = 1;
		this.ballSpeedY = 1;

		this.board = this.canvas.previousElementSibling;
		this.leftPlayerScore = this.board.querySelector('.score-left');
		this.rightPlayerScore = this.board.querySelector('.score-right');
		this.leftPlayerNum = 0;
		this.rightPlayerNum = 0;

		this.drow();
	}

	// отрисовка мячика
	ball() {
		this.ctx.fillStyle = 'red';
		this.ctx.beginPath();
		this.ctx.arc(this.ballX, this.ballY, this.ballSize, 0, 2 * Math.PI);
		this.ctx.fill();
	}

	// отрисовка рокеток
	raquets() {
		let playerLeft = new PlayerRacquet({
			canvas: document.querySelector('.play-field'),
			side: 'left',
			color: 'blue'
		});
		
		let playerRight = new PlayerRacquet({
			canvas: document.querySelector('.play-field'),
			side: 'right',
			color: 'green'
		});
	}


	// обновление параметров
	update() {
		this.ballX += this.ballSpeedX;
		this.ballY += this.ballSpeedY;
	}

	// проверка взаимодействий
	collisions() {
		// проверка удара о правую стенку
		if(this.ballX + this.ballSize >= this.width) {
			this.ballSpeedX = -this.ballSpeedX;
			this.scoring();
		}
		// проверка удара о левую стенку
		if(this.ballX - this.ballSize <= 0) {
			this.ballSpeedX = -this.ballSpeedX;
			this.scoring();
		}
		// проверка удара о нижнюю стенку
		if(this.ballY + this.ballSize >= this.height) {
			this.ballSpeedY = -this.ballSpeedY;
		}
		// проверка удара о верхнюю стенку
		if(this.ballY - this.ballSize <= 0) {
			this.ballSpeedY = -this.ballSpeedY;
		}
	}

	// подсчет очков
	scoring() {
		if (this.ballX + this.ballSize >= this.width) {
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
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

	//отрисовка
	drow() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.raquets();

		let loop = () => {
			this.clear();
			this.ball();
			this.update();
			this.collisions();

			window.requestAnimationFrame(loop);
		}

		window.requestAnimationFrame(loop);
	}
};

class PlayerRacquet {

	constructor(opt) {
		this.canvas = opt.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.side = opt.side;
		this.color = opt.color;
		this.width = 10;
		this.height = 60;

		this.drow();
		this.move();
	}

	// рисует рокетку
	drow() {
		this.ctx.fillStyle = this.color;

		if (this.side == 'left') {
			this.ctx.fillRect(0, (300 / 2) - (this.height / 2), this.width, this.height);
		}
		else if (this.side == 'right') {
			this.ctx.fillRect(500 - this.width, (300 / 2) - (this.height / 2), this.width, this.height);
		}
		else {
			console.error('Ошибка укания позиции игрока (введите left/right)');
		}
	}

	// двигает рокетку
	move() {
		document.addEventListener("keydown", wat);
		function wat(e) {
			console.log(e.keyCode);
		}
	}
}

let fieldTennis = new Tennis({
	canvas: document.querySelector('.play-field'),
	width: 500,
	height: 300
});