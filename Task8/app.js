window.Clocks = {

	opt: {
		wrap: document.querySelector('.clocks'),
		numsRadius: 150,
	},

	paint: function() {
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
	},

	init: function() {
		this.paint();
	}
}

Clocks.init();