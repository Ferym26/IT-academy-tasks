window.onload = function() {

	let btnEntry = $('.js_entry');
	let btnRecipe = $('.js_recipe');
	let btnDel = $('.js_del');
	let btnAll = $('.js_all');
	let btnAddIngrid = $('.js_ingredient-plus');
	let btnAddRecipe = $('.js_ingredient-add');
	let btnRecipeFind = $('.js_recipe-find');

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

	// добавляет строку ввода ингредиента
	btnAddIngrid.on('click', function() {
		ingridItem.clone().appendTo($('.ingredient-box'));
	});
	













	// Создаём класс коктейлей
	let coctailsStorage = new HashStorage;
	// Создаём объект всех коктейлей
	coctailsStorage.storage = {};

	coctailsStorage.storage['name1'] = {
		alco: true,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
			'Компонент 3': '300г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus a, vel voluptatibus voluptatum blanditiis sapiente est? Optio et dolores magnam veritatis unde nam sequi, corporis inventore rerum fuga. Commodi, natus.'
	};

	coctailsStorage.storage['name2'] = {
		alco: false,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adip'
	};
	
	coctailsStorage.addValue('name5', {a: 5});
	console.log('рецепт', coctailsStorage.getValue('name2'));
	coctailsStorage.delete('name1');
	coctailsStorage.getKeys();

	

	

	btnAddRecipe.on('click', function() {
		console.log('click');
		// получаем имя коктейля
		let recipeName = $('.recipe-name').val();
		let recipeIsAlco = $('.recipe-isalco').prop('checked');
		let recipeText = $('.recipe-text').val();

		// формируем объект всех данных для заполнения
		let ingrids = {};
		$('.ingredient-item').each(function() {
			let ingridItemName = $(this).find('.ingredient-item__name').val();
			let ingridItemValue = $(this).find('.ingredient-item__value').val();
			ingrids[ingridItemName] = ingridItemValue;
		});

		if (recipeName) {
			coctailsStorage.storage[recipeName] = {
				alco: recipeIsAlco,
				composition: ingrids,
				recipe: recipeText
			}
		}
		else {
			console.log('error');
		}

		console.log(coctailsStorage);
		
	});

	btnRecipeFind.on('click', function() {
		let recipeFindName = $('.js_recipe-find-name').val();
		if (recipeFindName && coctailsStorage.getValue(recipeFindName)) {
			console.log(`Рецепт коктейля ${recipeFindName}` + coctailsStorage.getValue(recipeFindName));
		}
		else {
			console.log('коктейль не найден');
		}
	});
	

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