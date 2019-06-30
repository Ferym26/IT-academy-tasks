const MeteorFall = (function () {

	let settings = {
		name: 'default name',
	};

	let _setSettings = function (userSettings) {
		settings.name = userSettings.name;
	};

	// MODEL
	let model = {
		showName: function () {
			console.log(settings.name);
		}
	}

	// VIEW
	let view = {

	};

	// CONTROLLER
	let controller = {
		events: function () {
			model.showName();
		},
	};

	let app = {
		init: function (userSettings) {
			_setSettings(userSettings);
			controller.events();
		},
	}

	return app;

})();

MeteorFall.init({
	name: 'Username',
});