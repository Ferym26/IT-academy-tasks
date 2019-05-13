window.onload = function() {

	let btnEntry = $('.js_entry');
	let btnRecipe = $('.js_recipe');
	let btnDel = $('.js_del');
	let btnAll = $('.js_all');
	let btnAddIngrid = $('.js_ingredient-plus');
	let btnAddRecipe = $('.js_ingredient-add');
	let btnRecipeFind = $('.js_recipe-find');
	let btnRecipeDel = $('.js_recipe-del');

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
		// предварительная очистка списка рецептов
		document.querySelector('.js_recipe-all-names').innerHTML = '';
		// добавление имен рецептов
		coctailsStorage.getKeys().forEach(function(item, i) {
			let recipeName = document.createElement('div');
			recipeName.innerHTML = item;
			document.querySelector('.js_recipe-all-names').appendChild(recipeName);
		})
	});

	// добавляет строку ввода ингредиента
	btnAddIngrid.on('click', function() {
		let clonedItem = ingridItem.clone();
		clonedItem.find('input').val('');
		clonedItem.appendTo($('.ingredient-box'));
	});
	













	// Создаём класс коктейлей
	let coctailsStorage = new HashStorage;
	// Создаём объект всех коктейлей
	// coctailsStorage.storage = {};

	coctailsStorage.storage['name1'] = {
		name: 'Name 1',
		alco: true,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
			'Компонент 3': '300г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus a, vel voluptatibus voluptatum blanditiis sapiente est? Optio et dolores magnam veritatis unde nam sequi, corporis inventore rerum fuga. Commodi, natus.'
	};

	coctailsStorage.storage['name2'] = {
		name: 'Name 2',
		alco: false,
		composition: {
			'Компонент 1': '100г',
			'Компонент 2': '200г',
		},
		recipe: 'Lorem ipsum dolor sit amet consectetur, adip'
	};
	
	// coctailsStorage.addValue('name5', {a: 5});
	// console.log('рецепт', coctailsStorage.getValue('name2'));
	// coctailsStorage.delete('name1');
	// console.log(coctailsStorage.getKeys());

	

	

	btnAddRecipe.on('click', function() {
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
				name:recipeName,
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

	// Находит и отображает рецепт коктейля
	btnRecipeFind.on('click', function() {
		let recipeFindName = $('.js_recipe-find-name').val();
		if (recipeFindName && coctailsStorage.getValue(recipeFindName)) {
			printRecipe(coctailsStorage.getValue(recipeFindName));
		}
		else {
			$('.js_recipe-find-result').text(`коктейль не найден!`);
		}
	});

	// Удаляет коктейль
	btnRecipeDel.on('click', function() {
		let recipeDelName = $('.js_recipe-del-name').val();
		if (recipeDelName && coctailsStorage.getValue(recipeDelName)) {
			coctailsStorage.delete(recipeDelName);
			$('.js_recipe-del-result').text(`Рецепт коктейля ${recipeDelName} удален`);
		}
		else {
			$('.js_recipe-del-result').text(`коктейль не найден!`);
		}
	});
	
	// выводит на экран рецепт
	function printRecipe(data) {
		let wrap = document.querySelector('.js_recipe-find-result');
		wrap.innerHTML = '';
		let recipe = data;

		// вывод названия
		let name = document.createElement('div');
		name.innerHTML = `Коктейль "<b>${recipe.name}</b>" (алкогольный: ${recipe.alco ? 'Да' : 'Нет'})`;
		wrap.appendChild(name);

		// вывод заголовка
		let title1 = document.createElement('div');
		title1.innerHTML = `Необходимые ингредиенты:`;
		wrap.appendChild(title1);

		// перебор компонентов
		for (let key in recipe.composition) {
			let component = document.createElement('div');
			component.innerHTML = `${key} ${recipe.composition[key]}`;
			wrap.appendChild(component);
		}

		// вывод заголовка
		let title2 = document.createElement('div');
		title2.innerHTML = `Рецепт приготовления:`;
		wrap.appendChild(title2);

		// вывод текста рецента
		let recipeText = document.createElement('div');
		recipeText.innerHTML = `${recipe.recipe}`;
		wrap.appendChild(recipeText);
	}	
};

