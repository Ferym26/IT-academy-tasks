class Tennis {

	constructor(opt) {
		this.canvas = opt.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.width = opt.width;
		this.height = opt.height;

		this.ballX = this.width / 2;
		this.ballY = this.height / 2;
		this.ballSize = 15;
		this.ballSpeed = 2;

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
		this.ctx.arc(this.ballX, this.ballY, this.ballSize, 0, 2*Math.PI);
		this.ctx.fill();
	}

	// обновление параметров
	update() {
		this.ballX += this.ballSpeed;
		this.ballY += 0;
	}

	// проверка взаимодействий
	collisions() {
		// проверка удара о правую стенку
		if(this.ballX + this.ballSize >= this.width) {
			this.ballSpeed = -this.ballSpeed;
			this.scoring();
		}
		// проверка удара о левую стенку
		if(this.ballX - this.ballSize <= 0) {
			this.ballSpeed = -this.ballSpeed;
			this.scoring();
		}
	}

	// подсчет очков
	scoring() {
		// если мяч на левой стороне поля - плюсуем правому
		// если на правой - левому
		if(this.ballX + this.ballSize >= this.width) {
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

let fieldTennis = new Tennis({
	canvas: document.querySelector('.play-field'),
	width: 500,
	height: 300
});