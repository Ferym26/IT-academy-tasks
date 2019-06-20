const CoolModal = (function () {

	this.settings = {
		name: 'default name',
	};

	this._setSettings = function (userSettings) {
		settings.name = userSettings.name;
	};

	// MODEL
	let model = {
		// открытие / закрытие модалки
		modalState: function (state, linkId) {
			view.modalState(state, linkId);
		},
		// закрывает все модалки
		modalCloseAll: function () {
			view.modalCloseAll();
		} ,
		// определяет тип линки и решает какую модалку открывать
		checkModalType: function (link) {
			if (link.hasAttribute('data-supermodal') && link.hasAttribute('data-supermodal-title') && link.hasAttribute('data-supermodal-content')) {
				console.log(3);
			}
			else if (link.hasAttribute('data-supermodal-title') && link.hasAttribute('data-supermodal-content')) {
				let title = link.getAttribute('data-supermodal-title');
				let content = link.getAttribute('data-supermodal-content');
				view.modalPushAdd(title, content);
				model.modalPushClose();
			}
			else if (link.hasAttribute('data-supermodal')) {
				controller.handleLinkOpen(link.dataset.supermodal);
			}
			else {
				console.log('а нифига хорошего');
			}
		},
		// закрывает пуш модалку
		modalPushClose: function() {
			controller.handlePushClose();
		}
	};

	// VIEW
	let view = {
		overlay: document.querySelector('.modal-overlay'),
		modalState: function (state, linkId) {
			let modal = document.querySelector(`#${linkId}`);
			if (state === 'open') {
				view.overlay.classList.remove('modal_closed');
				modal.classList.remove('modal_closed');
			}
			if (state === 'close') {
				view.overlay.classList.add('modal_closed');
				modal.classList.add('modal_closed');
			}
		},
		modalCloseAll: function () {
			let allModals = document.querySelectorAll('.modal');
			allModals.forEach((item) => {
				view.overlay.classList.add('modal_closed');
				item.classList.add('modal_closed');
			});
		},
		// добавляет в боди пуш модалку
		modalPushAdd: function (title, content) {
			let pushHtml = `<div class='modal-push'>` + 
								`<div class='modal-push__title'>${title}</div>` +
								`<div class='modal-push__content'>${content}</div>` +
							`</div>`
			document.body.insertAdjacentHTML("beforeEnd", pushHtml);
		}
	};

	// CONTROLLER
	let controller = {
		events: function () {
			let openLink = document.querySelectorAll('.container a');
			let btnClose = document.querySelectorAll('.modal__close');
			let overlay = document.querySelector('.modal-overlay');

			openLink.forEach((link) => {
				link.addEventListener('click', function (e) {
					e.preventDefault();
					// передаём линку в модель для определения типа
					model.checkModalType(link);
				});
			})

			// btnClose[i].addEventListener('click', function (e) {
			// 	e.preventDefault();
			// 	controller.handleButtonClose(openLink[i].dataset.supermodal);
			// });

			overlay.addEventListener('click', function (e) {
				controller.handleOverlayClose();
			});
		},

		handleLinkOpen: function (linkId) {
			model.modalState('open', linkId);
		},
		handleButtonClose: function (linkId) {
			model.modalState('close', linkId);
		},
		handleOverlayClose: function (linkId) {
			model.modalCloseAll();
		},
		// убирает пушмодалаку
		handlePushClose: function() {
			let modalPush = document.querySelectorAll('.modal-push');
			modalPush.forEach((item) => {
				setTimeout(function() {
					item.remove();
				}, 3000)
			}) 
		}
	};

	let app = {
		init: function (userSettings) {
			_setSettings(userSettings);
			controller.events();
		},
	}

	return app;

})();

CoolModal.init({
	name: 'name1234',
});