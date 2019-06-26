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
			let linkData = {
				id: link.getAttribute('data-supermodal'),
				title: link.getAttribute('data-supermodal-title'),
				content: link.getAttribute('data-supermodal-content'),
			}
			// На ссылке все нужные атрибуты
			if (link.hasAttribute('data-supermodal') && link.hasAttribute('data-supermodal-title') && link.hasAttribute('data-supermodal-content')) {
				view.modalBig(linkData);
				controller.handleLinkOpen(linkData.id);
			}
			// на ссылке атрибуты заголовка и сонтента
			else if (link.hasAttribute('data-supermodal-title') && link.hasAttribute('data-supermodal-content')) {
				let title = link.getAttribute('data-supermodal-title');
				let content = link.getAttribute('data-supermodal-content');
				view.modalPushAdd(title, content);
				model.modalPushClose();
			}
			// на ссылке только id атрибут
			else if (link.hasAttribute('data-supermodal')) {
				controller.handleLinkOpen(linkData.id);
			}
			else {
				console.log('а нифига хорошего');
			}
		},
		// закрывает пуш модалку
		modalPushClose: function() {
			controller.handlePushClose();
		},
		// получает разметку модалка аяксом
		modalGetHtml: function () {
			$.ajax({
				url: './testAjax/modalHtml.html',
				type: 'GET',
				dataType:'html',
				success: function(data, textStatus) {
					view.modalAjax(data);
				},
				error: function () {
					console.log('(((');
				}
			});
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
		// закрывает все модалки
		modalCloseAll: function () {
			let allModals = document.getElementsByClassName('modal');
			for(let i = 0; i < allModals.length; i++) {
				view.overlay.classList.add('modal_closed');
				allModals[i].classList.add('modal_closed');
			}
		},
		// добавляет в боди пуш модалку
		modalPushAdd: function (title, content) {
			let pushHtmlModal = `<div class='modal-push'>` +
									`<div class='modal-push__title'>${title}</div>` +
									`<div class='modal-push__content'>${content}</div>` +
								`</div>`;
			document.body.insertAdjacentHTML("beforeEnd", pushHtmlModal);
		},
		// модалка со всеми атрибутами
		modalBig: function (linkData) {
			let bigHtmlModal = `<div class='modal' id="${linkData.id}">` +
									`<header class="modal__header">` +
										`<a href="#" class="modal__close" title="Закрыть модальное окно">Закрыть</a>` +
										`<h2>${linkData.title}</h2>` +
									`</header>` +
									`<main class="modal__content">${linkData.content}</main>` +
								`</div>`;
			// проверка на наличие окна с текущим ID
			if (document.querySelector(`#${linkData.id}`) == null) {
				document.body.insertAdjacentHTML("beforeEnd", bigHtmlModal);
			}
		},
		// добавляет в боди модалку из ajax
		modalAjax: function (html) {
			document.body.insertAdjacentHTML("beforeEnd", html);
		}
	};

	// CONTROLLER
	let controller = {
		events: function () {
			let openLink = document.querySelectorAll('.container a');
			let btnClose = document.getElementsByClassName('modal__close');
			let overlay = document.querySelector('.modal-overlay');

			openLink.forEach((link) => {
				link.addEventListener('click', function (e) {
					e.preventDefault();
					// передаём линку в модель для определения типа
					model.checkModalType(link);
				});
			})

			for(let i = 0; i < btnClose.length; i++) {
				btnClose[i].addEventListener('click', function (e) {
					e.preventDefault();
					model.modalCloseAll();
					console.log(btnClose);
				});
			}

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