class Weatherwidget {

	constructor(settings) {
		this.key = settings.key;
		this.city = settings.city;
		this.cityId = settings.cityId;
		this.apiVertion = settings.apiVertion || 2.5;
		this.cityData = {};

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
				_this.cityData = data;
			})
			.catch(console);
	}

	createRequestPath(type) {
		// type = weather / forecast / ...
		let _this = this;
		// 'http://api.openweathermap.org/data/2.5/weather?q=London&APPID=d7b3ed5991f3eab2ccf5635d262ad69e'
		let pref = 'http://api.openweathermap.org/data/';
		let path = `${pref}${_this.apiVertion}/${type}?q=${_this.city}&APPID=${_this.key}`;
		return path;
	}
}

let widget = new Weatherwidget({
	key: 'd7b3ed5991f3eab2ccf5635d262ad69e',
	city: 'Omsk',
	cityId: '',
	apiVertion: 2.5,
});