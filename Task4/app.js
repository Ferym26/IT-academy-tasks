window.onload = function() {

	let btnEntry = $('.js_entry');
	let btnRecipe = $('.js_recipe');
	let btnDel = $('.js_del');
	let btnAll = $('.js_all');
	let btnAddIngrid = $('.js_ingredient-plus');

	let actionBlocks = $('.action-item');
	let actionEntry = $('.action-entry');
	let actionRecipe = $('.action-recipe');
	let actionDel = $('.action-del');
	let actionAll = $('.action-all');

	let ingridItem = $('.ingredient-item');

	btnEntry.on('click', function() {
		actionBlocks.hide();
		actionEntry.show();
	});

	btnRecipe.on('click', function() {
		actionBlocks.hide();
		actionRecipe.show();
	});

	btnDel.on('click', function() {
		actionBlocks.hide();
		actionDel.show();
	});

	btnAll.on('click', function() {
		actionBlocks.hide();
		actionAll.show();
	});

	// добавляет строку ввожа ингредиента
	btnAddIngrid.on('click', function() {
		ingridItem.clone().appendTo($('.ingredient-box'));
	});
	













	// Создаём класс коктейлей
	let coctailsStorage = new HashStorage;
	// Создаём объект всех коктейлей
	coctailsStorage.recipes = {};

	coctailsStorage.recipes['name1'] = {
		alco: true,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
			'Компонент 3': '300г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus a, vel voluptatibus voluptatum blanditiis sapiente est? Optio et dolores magnam veritatis unde nam sequi, corporis inventore rerum fuga. Commodi, natus.'
	};

	coctailsStorage.recipes['name2'] = {
		alco: false,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adip'
	};
	
	coctailsStorage.addValue('name5', {a: 5});
	coctailsStorage.getValue('name2');
	coctailsStorage.delete('name1');
	coctailsStorage.getKeys();

	console.log(coctailsStorage);

	// let exmpl = {
	// 	'name1': {
	// 		alco: true,
	// 		composition: {
	// 			'Компонент 1': '100г',
	// 			'Компонент 2': '200г',
	// 			'Компонент 3': '300г',
	// 		},
	// 		recipe: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus a, vel voluptatibus voluptatum blanditiis sapiente est? Optio et dolores magnam veritatis unde nam sequi, corporis inventore rerum fuga. Commodi, natus.'
	// 	},
	// 	'name2': {
	// 		alco: true,
	// 		composition: {
	// 			'Компонент 1': '100г',
	// 			'Компонент 2': '200г',
	// 		},
	// 		recipe: 'Lorem ipsum dolor sit amet consectetu'
	// 	},
	// }
	
};