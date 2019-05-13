window.Calendar = {

	// TODO: пустые ячейки покрасить

	opt: {
		userYear: 2019,
		userMonth: 2,
		wrap: document.querySelector('.calendar'),
		day: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
		month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
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

	drowTitle: function() {
		let calendarTitle = document.createElement('div');
		calendarTitle.className = 'calendar__title';
		calendarTitle.innerHTML = `${this.opt.month[this.opt.userMonth - 1]} ${this.opt.userYear} года`;
		this.opt.wrap.appendChild(calendarTitle);
	},

	drowDayNames: function() {
		let dayNamesWrap = document.createElement('div');
		dayNamesWrap.className = 'calendar__row calendar__days';
		this.opt.wrap.appendChild(dayNamesWrap);
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
		this.opt.wrap.appendChild(dayNumsWrap);

		// добавление пустых ячеек дней в начало месяца
		for(let i = 1; i <= this.opt.firstDayIndex - 1; i++) {
			let dayNum = document.createElement('div');
			dayNum.className = 'calendar__col calendar__num';
			dayNumsWrap.appendChild(dayNum);
		}

		// добавление числел дней
		for(let i = 1; i <= this.opt.daysInMonth; i++) {
			let dayNum = document.createElement('div');
			dayNum.className = 'calendar__col calendar__num';
			dayNum.innerHTML = i;
			dayNumsWrap.appendChild(dayNum);
		}
	},

	drowHeader: function() {

	},
	
	init: function() {
		this.getTime();
		this.drowTitle();
		this.drowDayNames();
		this.drowDays();
		this.drowHeader();
	}
}

Calendar.init();