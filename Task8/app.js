window.Clocks = {

	opt: {
		wrap: document.querySelector('.clocks'),
		numsRadius: 150,
		currTime: {},
	},

	paint: function() {
		let _self = this;
		// добавление цифр циферблата
		for(let i = 1; i <= 12; i++) {
			let numPoint = document.createElement('div');
			numPoint.classList.add('num-point');
			numPoint.innerHTML = i;
			let numPointX = this.opt.numsRadius * Math.sin(-30 * i * (Math.PI / 180) + Math.PI);
			let numPointY = this.opt.numsRadius * Math.cos(-30 * i * (Math.PI / 180) + Math.PI);
			numPoint.style.top = 185 + numPointY + 'px';
			numPoint.style.left = 185 + numPointX + 'px';
			this.opt.wrap.appendChild(numPoint);
		}

		// добавление стрелок
		let arrowH = document.createElement('div');
		let arrowM = document.createElement('div');
		let arrowS = document.createElement('div');
		arrowH.className = 'arrow arrow--hour';
		arrowM.className = 'arrow arrow--min';
		arrowS.className = 'arrow arrow--sec';
		this.opt.wrap.appendChild(arrowH);
		// this.opt.wrap.appendChild(arrowM);
		// this.opt.wrap.appendChild(arrowS);

		// добавление цифровых часов
		let numClocks = document.createElement('div');
		numClocks.className = 'num-clocks';

		
		function clocks() {
			let niceHour = _self.opt.currTime.hour;
			let niceMin = _self.opt.currTime.min;
			let niceSec = _self.opt.currTime.sec;
			niceHour < 10 ? niceHour = '0' + niceHour : niceHour;
			niceMin < 10 ? niceMin = '0' + niceMin : niceMin;
			niceSec < 10 ? niceSec = '0' + niceSec : niceSec;
			numClocks.innerHTML = '';
			numClocks.innerHTML = `${niceHour}:${niceMin}:${niceSec}`;
			_self.opt.wrap.appendChild(numClocks);
			console.log('tick');
		}
		let clocksTick = setInterval(function() {
			clocks();
		}, 1000);
		
	},

	time: function() {
		let _self = this;
		function currTime() {
			let time = new Date();
			let hour = time.getHours();
			let min = time.getMinutes();
			let sec = time.getSeconds();
			_self.opt.currTime.hour = hour;
			_self.opt.currTime.min = min;
			_self.opt.currTime.sec = sec;
		}

		let timer = setInterval(function() {
			currTime();
		}, 1000);

		currTime();

	},

	init: function() {
		this.time();
		this.paint();
		
	}
}

Clocks.init();