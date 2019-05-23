function Clocks() {

	opt = {
		currTime: {},
	};

	this.time = function() {
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
	};

}

let clocksCanvas = new Clocks;
clocksCanvas.time();
console.log(clocksCanvas.opt.currTime);