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
	let storage = {};
	this.addValue = function(key, value) {
		this.storage[key] = value;
	};
	this.getValue = function(key) {
		return this.storage[key];
	};
	this.delete = function(key) {
		delete this.storage[key];
	};
	this.getKeys = function() {
		return Object.keys(this.storage);
	};
}