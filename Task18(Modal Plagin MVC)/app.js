// MODEL
let model = {
	dataObj: {
		name: null,
		day: null,
		month: null,
		year: null
	},
	modalState: function (state) {
		view.modalState(state);
	},
	setData: function (key) {
		localStorage.setItem(key, JSON.stringify(this.dataObj));
	},
	getData: function (key) {
		return JSON.parse(localStorage.getItem(key));
	},
	removeData: function (key) {
		localStorage.removeItem(key);
	},
	showInfo: function (key) {
		let data = model.getData(key)
		view.showInfo(data);
	},
	removeInfo: function (key) {
		model.removeData(key)
		view.removeInfo();
	}
};

// VIEW
let view = {
	modal: document.querySelector('.modal'),
	targetBox: document.querySelector(".target"),
	modalState: function (state) {
		let overlay = document.querySelector('.modal-overlay');

		if (state === 'open') {
			overlay.classList.remove('modal_closed');
			view.modal.classList.remove('modal_closed');
		}
		if (state === 'close') {
			overlay.classList.add('modal_closed');
			view.modal.classList.add('modal_closed');
		}
	},
	showInfo: function (data) {
		let helloStr = data.name ? `Привет, ${data.name}!` : `Ваше имя не известно =(`;
		let birthdayStr = (data.day && data.month && data.year) ? `У тебя ДР ${data.day}/${data.month}/${data.year}` : `Дата ДР неизвестна`;

		view.targetBox.innerHTML = `<p>${helloStr}</p>` +
			`<p>${birthdayStr}</p>` +
			`<a href='#' class='clearData'>Очистить данные</a>`;
	},
	removeInfo: function () {
		view.targetBox.innerHTML = `<p>Данные отсутствуют</p>`;
	}
};

// CONTROLLER
let controller = {
	events: function () {
		let btnOpen = document.querySelector('.modal-open');
		let btnClose = document.querySelector('.modal__close')
		let btnCancel = document.querySelector('.modal__cancel');
		let overlay = document.querySelector('.modal-overlay');
		let btnSave = document.querySelector('#modal-save');

		btnOpen.addEventListener('click', function (e) {
			e.preventDefault();
			controller.handleButtonOpen();
		});
		btnClose.addEventListener('click', function (e) {
			e.preventDefault();
			controller.handleButtonClose();
		});
		btnCancel.addEventListener('click', function (e) {
			e.preventDefault();
			controller.handleButtonClose();
		});
		overlay.addEventListener('click', function (e) {
			controller.handleButtonClose();
		});
		btnSave.addEventListener('click', function (e) {
			controller.handleSaveData();
		});
		if (localStorage.getItem('userData')) {
			model.showInfo('userData');
			controller.handleRemoveInfo();
		};
	},
	clearModalInputs: function () {
		let inputs = document.querySelectorAll('.modal input');

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].value = '';
		}
	},
	handleButtonOpen: function () {
		model.modalState('open');
	},
	handleButtonClose: function () {
		controller.clearModalInputs();
		model.modalState('close');
	},
	handleSaveData: function () {
		let inputName = document.querySelector('#name');
		let inputDay = document.querySelector('#birth-day');
		let inputMonth = document.querySelector('#birth-month');
		let inputYear = document.querySelector('#birth-year');

		model.dataObj.name = inputName.value;
		model.dataObj.day = inputDay.value;
		model.dataObj.month = inputMonth.value;
		model.dataObj.year = inputYear.value;

		if (model.dataObj.name && model.dataObj.day && model.dataObj.month && model.dataObj.year) {
			model.setData('userData');
			model.modalState('close');
			model.showInfo('userData');
		} else {
			alert('Необходимо заполнить все поля!');
		}
	},
	handleRemoveInfo: function () {
		let clearBtn = document.querySelector('.clearData');

		clearBtn.addEventListener("click", function (e) {
			e.preventDefault();
			model.removeInfo('userData');
		});
	},
};

(function () {

	let app = {

		init: function () {
			this.main();
		},

		main: function () {
			controller.events();
		}
	}

	app.init();

}());






const CoolModal = (function () {

	let opt = {
		name: 'default name',
	}

	function _setOpts(userOpts) {
		opt.name = userOpts.name;
	}

	function _privateMethod() {
		console.log(opt.name);
	};
	

	let app = {
		publicMethod: function (userOpts) {
			_setOpts(userOpts);
			_privateMethod();
		},
	}

	return app;

})();

CoolModal.publicMethod({
	name: 'name1234',
});