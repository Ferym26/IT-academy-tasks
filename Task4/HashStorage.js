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
	let storage = {};
	this.addValue = function(key, value) {
		this.storage[key] = value;
	};
	this.getValue = function(key) {
		console.log('рецепт коктейля', this.storage[key]);
	};
	this.delete = function(key) {
		delete this.storage[key];
	};
	this.getKeys = function() {
		console.log('Все коктейли', Object.keys(this.storage));
	};
}