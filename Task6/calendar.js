window.Calendar = {

	opt: {
		userYear: 2019,
		userMonth: 1,
		wrap: document.querySelector('.calendar-wrap'),
		calendar: null,
		day: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
		month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		years: function() {
			let arr = [];
			for(let i = 1980; i <= 2019; i++) {
				arr.push(i);
			}
			return arr;
		},
		firstDayIndex: null, //номер первого дня в месяце
		daysInMonth: null, // кол-во днец в месяце
	},
	
	getTime: function() {
		let time = new Date(this.opt.userYear, this.opt.userMonth - 1);

		// добавление метода подсчета кол-ва дней в месяце
		Date.prototype.daysInMonth = function() {
			return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
		};

		this.opt.firstDayIndex = time.getDay();
		this.opt.daysInMonth = time.daysInMonth();
	},

	drowCalendarBox: function() {
		let calendarBox = document.createElement('div');
		calendarBox.className = 'calendar';
		this.opt.wrap.appendChild(calendarBox);
		this.opt.calendar = calendarBox;
	},

	drowTitle: function() {
		let calendarTitle = document.createElement('div');
		calendarTitle.className = 'calendar__title';
		calendarTitle.innerHTML = `${this.opt.month[this.opt.userMonth - 1]} ${this.opt.userYear} года`;
		this.opt.calendar.appendChild(calendarTitle);
	},

	drowDayNames: function() {
		let dayNamesWrap = document.createElement('div');
		dayNamesWrap.className = 'calendar__row calendar__days';
		this.opt.calendar.appendChild(dayNamesWrap);
		// добавление название дней
		this.opt.day.forEach(function(item, i) {
			let dayName = document.createElement('div');
			dayName.className = 'calendar__col calendar__day';
			dayName.innerHTML = item;
			dayNamesWrap.appendChild(dayName);
		})
	},

	drowDays: function() {
		let dayNumsWrap = document.createElement('div');
		dayNumsWrap.className = 'calendar__row calendar__nums';
		this.opt.calendar.appendChild(dayNumsWrap);

		// добавление пустых ячеек дней в начало месяца
		for(let i = 1; i <= this.opt.firstDayIndex - 1; i++) {
			let dayNum = document.createElement('div');
			dayNum.className = 'calendar__col calendar__num calendar__num--empty';
			dayNumsWrap.appendChild(dayNum);
		}

		// добавление числел дней
		for(let i = 1; i <= this.opt.daysInMonth; i++) {
			let dayNum = document.createElement('div');
			dayNum.className = 'calendar__col calendar__num';
			dayNum.innerHTML = i;
			dayNumsWrap.appendChild(dayNum);
		}

		// TODO: доделать
		// добавление пустых ячеек в конец месяца
		// for(let i = this.opt.daysInMonth; i < 31; i++) {
		// 	let dayNum = document.createElement('div');
		// 	dayNum.className = 'calendar__col calendar__num calendar__num--empty';
		// 	dayNumsWrap.appendChild(dayNum);
		// }
	},
	
	init: function(year, month) {
		year ? this.opt.userYear = year : false;
		month ? this.opt.userMonth = month : false;
		this.getTime();
		this.drowCalendarBox();
		this.drowTitle();
		this.drowDayNames();
		this.drowDays();
	}
}

Calendar.init();



window.UI = {

	opt: {
		selectedYear: null,
		selectedMonth: null,
	},

	drowHeader: function() {
		let calendarHeader = document.createElement('div');
		calendarHeader.className = 'calendar-header';

		// добавление селекта выбора лет
		let selectYear = document.createElement('select');
		selectYear.className = 'js_select-year';
		let selectYearOption = document.createElement('option');
		selectYearOption.setAttribute('value', 'default');
		selectYearOption.innerHTML = 'Выбор года';
		selectYear.appendChild(selectYearOption);
		Calendar.opt.years().forEach(function(item, i) {
			let selectYearOption = document.createElement('option');
			selectYearOption.setAttribute('value', item);
			selectYearOption.innerHTML = item;
			selectYear.appendChild(selectYearOption);
		});
		calendarHeader.appendChild(selectYear);

		// добавление селекта выбора месяцев
		let selectMonth = document.createElement('select');
		selectMonth.className = 'js_select-month';
		let selectMonthOption = document.createElement('option');
		selectMonthOption.setAttribute('value', 'default');
		selectMonthOption.innerHTML = 'Выбор месяца';
		selectMonth.appendChild(selectMonthOption);
		Calendar.opt.month.forEach(function(item, i) {
			let selectMonthOption = document.createElement('option');
			selectMonthOption.setAttribute('value', i + 1);
			selectMonthOption.innerHTML = item;
			selectMonth.appendChild(selectMonthOption);
		});
		calendarHeader.appendChild(selectMonth);

		// добавление кнопки
		let buttonAdd = document.createElement('button');
		buttonAdd.classList = 'js_button-add';
		buttonAdd.setAttribute('disabled', 'true')
		buttonAdd.innerHTML= 'Создать';
		calendarHeader.appendChild(buttonAdd);

		document.querySelector('body').insertBefore(calendarHeader, document.querySelector('.calendar-wrap'));
	},

	events: function() {
		let _self = this;
		let selectMonth = document.querySelector('.js_select-month');
		let selectYear = document.querySelector('.js_select-year');
		let selects = document.querySelectorAll('.calendar-header select');
		let btnAdd = document.querySelector('.js_button-add');

		// передаём выбранный индекс месяца в настройки
		selectMonth.addEventListener('change', getMonth);
		function getMonth() {
			_self.opt.selectedMonth = selectMonth.value;
		}

		// передаём выбранный год в настройки
		selectYear.addEventListener('change', getYear);
		function getYear() {
			_self.opt.selectedYear = selectYear.value;
		}

		// переключение состояния кнопки СОЗДАть в зависимости от состояний селектов
		selects.forEach(function(item) {
			item.addEventListener('change', btnToggler);	
		});
		function btnToggler() {
			if (selectMonth.value != 'default' && selectYear.value != 'default') {
				btnAdd.removeAttribute('disabled');
			}
			else {
				btnAdd.setAttribute('disabled', 'true');
			}
		}
		
	},

	newCalendar: function() {
		let _self = this;
		let btnAdd = document.querySelector('.js_button-add');
		btnAdd.addEventListener('click', addNewCalendar);
		function addNewCalendar() {
			Calendar.init(_self.opt.selectedYear, _self.opt.selectedMonth);
		}
		
	},

	init: function() {
		this.drowHeader();
		this.events();
		this.newCalendar();
	}
}

UI.init();