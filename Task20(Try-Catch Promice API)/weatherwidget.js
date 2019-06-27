class Weatherwidget {

	constructor(settings) {
		this.key = settings.key;
		this.city = settings.city;
		this.apiVertion = settings.apiVertion || 2.5;
		this.cityWeather = {};
		this.cityForecast = {};

		this.wrap = null;
		this.getWeather();
	}

	getWeather() {
		let _this = this;
		// api.openweathermap.org/data/2.5/weather?id=2172797
		fetch(_this.createRequestPath('weather'))
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				_this.cityWeather = data;
				_this.createWidget();
			})
			.catch(console);
	}

	getForecast() {
		let _this = this;
		fetch(_this.createRequestPath('forecast'))
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				_this.cityForecast = data;
				_this.createForecast();
			})
			.catch(console);
	}

	createRequestPath(type) {
		// type = weather / forecast / ...
		let _this = this;
		// 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d7b3ed5991f3eab2ccf5635d262ad69e'
		let pref = 'http://api.openweathermap.org/data/';
		let path = `${pref}${_this.apiVertion}/${type}?q=${_this.city}&units=metric&APPID=${_this.key}`;
		return path;
	}

	createWidget() {
		let _this = this;
		let template =	`<div class="ww ww-hidden">` +
							`<div class="ww__icon">` +
								`<img src="http://openweathermap.org/img/wn/${_this.cityWeather.weather[0].icon}@2x.png" alt=""icon>` +
							`</div>` +
							`<div class="ww__city">${_this.city}</div>` +
							`<div class="ww__t">${_this.cityWeather.main.temp} °C</div>` +
							`<div class="ww__wind">Ветер: ${_this.cityWeather.wind.speed} м/с</div>` +
							`<div class="ww__close">🞨</div>` +
							`<div class="ww__forecast-open" title="Прогноз на 3 дня">?</div>` +
							`<div class="ww__forecast"></div>` +
						`</div>`;
		document.body.insertAdjacentHTML("beforeEnd", template);
		_this.wrap = document.querySelector('.ww');
		setTimeout(function() {
			_this.wrap.classList.remove('ww-hidden');
		}, 0);
		_this.controller();
	}

	createForecast() {
		let _this = this;
		let forecastWrap = document.querySelector('.ww__forecast');
		_this.cityForecast.list.forEach((item, i) => {
			if (i == 5 || i == 13 || i == 21) {
				let forecastTemplate =	`<div class="ww__forecast-item">` +
											`<div class="ww__forecast-item-t">${Math.floor(item.main.temp)} °C</div>` +
											`<img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt=""icon>` +
										`</div>`;
				forecastWrap.insertAdjacentHTML("beforeEnd", forecastTemplate);
			}
		})
	}

	controller() {
		let _this = this;
		let closeBtn = document.querySelector('.ww__close');
		let forecastBtn = document.querySelector('.ww__forecast-open');
		closeBtn.addEventListener('click', modalClose);
		forecastBtn.addEventListener('click', forecastOpen);
		function modalClose() {
			_this.wrap.classList.add('ww-hidden');
		};
		function forecastOpen() {
			_this.getForecast();
		}
	}
}

let widget = new Weatherwidget({
	key: 'd7b3ed5991f3eab2ccf5635d262ad69e',
	city: 'Minsk',
	apiVertion: 2.5,
});