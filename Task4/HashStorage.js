// Класс
// const HashStorage = {
// 	addValue: function(key, value) {
// 		console.log('addValue');
// 	},
// 	getValue: function(key) {
// 		console.log('getValue');
// 	},
// 	delete: function(key) {
// 		console.log('del');
// 	},
// 	getKeys: function() {
// 		console.log('getKeys');
// 	}
// }

function HashStorage() {
	let self = this;
	this.addValue = function(key, value) {
		this.recipes[key] = value;
	};
	this.getValue = function(key) {
		console.log('рецепт коктейля', this.recipes[key]);
	};
	this.delete = function(key) {
		delete this.recipes[key];
	};
	this.getKeys = function() {
		console.log('Все коктейли', Object.keys(this.recipes));
	};
}