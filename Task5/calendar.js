window.Calendar = {

	opt: {
		wrap: document.querySelector('.calendar'),
		dayNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
	},
	
	getTime: function() {
		var now = new Date(2000, 1);
		console.log(now);
	},

	drow: function() {
		let calendarTitle = document.createElement('div');
		calendarTitle.className = 'calendar__title';
		this.opt.wrap.appendChild(calendarTitle)
	},
	
	init: function() {
		this.getTime();
	}
}

Calendar.init();