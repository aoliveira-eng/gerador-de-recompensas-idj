// Função para rolar dados
function rollDie(rolls, die) {
	let sum = 0;
	for (let i = 0; i < rolls; i++) {
		sum += Math.floor(Math.random() * die) + 1; // Gera um número aleatório entre 1 e o valor do dado
	}
	return sum;
}

function basicGenerator(type) {
	if (!type || typeof type !== 'object') return null;
	const dHundred = rollDie(1, 100);
	for (const chance in type) {
		if (dHundred - 1 < chance) {
			return type[chance];
		}
	}
	return null;
}

// Função para gerar riquezas
function richesGenerator(rolls, die, modifier, multiplicator, value) {
	const result = (rollDie(rolls, die) + modifier) * multiplicator; // Calcula o valor das riquezas
	return `${result} ${value}`; // Retorna o valor formatado
}

// Função para gerar itens raros
function rareItemGenerator(rolls, die, modifier, richType) {
	let quantity = rollDie(rolls, die) + modifier;
	let masterpieceLib = new Map();
	let totalRiches = 0;
	let totalValue = 0;

	for (let i = 0; i < quantity; i++) {
		const dHundred = rollDie(1, 100);
		for (const cd in richType) {
			if (dHundred <= cd) {
				// Verifica se o valor do d100 corresponde a um item raro
				const masterpiece =
					richType[cd].examples[
						Math.floor(Math.random() * richType[cd].examples.length)
					];
				const price = richType[cd].price();

				if (masterpieceLib.has(masterpiece)) {
					// Se existir, atualiza a quantidade e adiciona o preço à lista de preços
					const existing = masterpieceLib.get(masterpiece);
					existing.prices.push(price); // Adiciona o novo preço à lista
					masterpieceLib.set(masterpiece, {
						quantity: existing.quantity + 1,
						prices: existing.prices, // Mantém a lista de preços
					});
				} else {
					// Se não existir, adiciona ao Map com quantidade 1 e uma lista contendo o preço
					masterpieceLib.set(masterpiece, {
						quantity: 1,
						prices: [price], // Inicia a lista de preços
					});
				}
				totalRiches += 1; // Adiciona 1 à quantidade de riquezas
				totalValue += price; // Adiciona o preço ao valor total
				break;
			}
		}
	}

	// Formata a lista de itens raros
	const formattedItems = [];
	for (const [masterpiece, data] of masterpieceLib.entries()) {
		if (data.quantity > 1) {
			// Se houver mais de uma unidade, formata os preços
			const pricesFormatted = formatPrices(data.prices); // Formata os preços
			formattedItems.push(
				`(${data.quantity}x) ${masterpiece} (${pricesFormatted})`
			);
		} else {
			// Se houver apenas uma unidade, adiciona sem a quantidade
			formattedItems.push(`${masterpiece} (${data.prices[0]} ¥o)`);
		}
	}

	// Retorna a lista formatada com o total
	if (formattedItems.length === 1) {
		return `${formattedItems[0]}. Total: ${totalValue} ¥o`; // Retorna o único item com o total
	} else if (formattedItems.length === 2) {
		return `${totalRiches} itens. ${formattedItems[0]} e ${formattedItems[1]}. Total: ${totalValue} ¥o`; // Retorna dois itens separados por "e" com o total
	} else if (formattedItems.length > 2) {
		const allButLast = formattedItems.slice(0, -1).join(', '); // Separa todos os itens, exceto o último, por vírgula
		const lastItem = formattedItems[formattedItems.length - 1]; // Pega o último item
		return `${totalRiches} itens. ${allButLast} e ${lastItem}. Total: ${totalValue} ¥o`; // Retorna a lista formatada com o total
	} else {
		return 'Nenhum item encontrado.'; // Retorna uma mensagem se nenhum item for encontrado
	}
}

// Função para formatar os preços
function formatPrices(prices) {
	if (prices.length === 1) {
		return `${prices[0]} ¥o`; // Retorna o preço único
	} else if (prices.length === 2) {
		return `${prices[0]} ¥o e ${prices[1]} ¥o`; // Retorna dois preços separados por "e"
	} else if (prices.length > 2) {
		const allButLast = prices.slice(0, -1).join(' ¥o, '); // Separa todos os preços, exceto o último, por vírgula
		const lastPrice = prices[prices.length - 1]; // Pega o último preço
		return `${allButLast} ¥o e ${lastPrice} ¥o`; // Retorna a lista formatada
	}
	return ''; // Caso não haja preços
}

// Função para carregar e transformar dados JSON
async function loadAndTransformJSON(url, transformFn) {
	const response = await fetch(url);
	const data = await response.json();
	if (transformFn) {
		transformFn(data);
	}
	return data;
}

function transformFunctions(data, isNested = false) {
	const transformValue = (value) => {
		if (typeof value === 'string') {
			if (value.trim().startsWith('return')) {
				try {
					return new Function(value);
				} catch (e) {
					console.error('Erro ao criar função:', e);
					return value;
				}
			}
		}
		return value;
	};

	for (const key in data) {
		if (isNested && typeof data[key] === 'object') {
			for (const subKey in data[key]) {
				data[key][subKey] = transformValue(data[key][subKey]);
			}
		} else {
			data[key] = transformValue(data[key]);

			// Transforma propriedades 'price' se existirem
			if (data[key] && typeof data[key] === 'object' && data[key].price) {
				data[key].price = transformValue(data[key].price);
			}
		}
	}
}

// Carregar os dados dos arquivos JSON
let items, weapons, armors, clothings, gems, arts, richesDict, equipmentDict;

Promise.all([
	loadAndTransformJSON('scripts/dictionaries/items.json'),
	loadAndTransformJSON('scripts/dictionaries/weapons.json'),
	loadAndTransformJSON('scripts/dictionaries/armors.json', (data) =>
		transformFunctions(data, false)
	),
	loadAndTransformJSON('scripts/dictionaries/clothings.json'),
	loadAndTransformJSON('scripts/dictionaries/gems.json', transformFunctions),
	loadAndTransformJSON('scripts/dictionaries/arts.json', transformFunctions),
	loadAndTransformJSON('scripts/dictionaries/riches.json', (data) =>
		transformFunctions(data, true)
	),
	loadAndTransformJSON('scripts/dictionaries/equipment.json', (data) =>
		transformFunctions(data, true)
	),
]).then(
	([
		itemsData,
		weaponsData,
		armorsData,
		clothingsData,
		gemsData,
		artsData,
		richesData,
		equipmentData,
	]) => {
		items = itemsData;
		weapons = weaponsData;
		armors = armorsData;
		clothings = clothingsData;
		gems = gemsData;
		arts = artsData;
		richesDict = richesData;
		equipmentDict = equipmentData;
	}
);

// Função para buscar um valor no dicionário com base no resultado do dado
function getValueFromDict(dict, nd) {
	if (!dict || !dict[nd]) return 'ND inválido';

	const dHundred = rollDie(1, 100);

	for (const cd in dict[nd]) {
		if (dHundred <= parseInt(cd)) {
			const value = dict[nd][cd];

			// Se for função, executa
			if (typeof value === 'function') {
				try {
					const result = value();
					// Se o resultado for outra função (caso aninhado), executa novamente
					return typeof result === 'function' ? result() : result;
				} catch (e) {
					console.error('Erro ao executar função:', e);
					return `Erro: ${e.message}`;
				}
			}
			return value;
		}
	}
	return 'Nenhum item encontrado';
}

// Função para obter o ND selecionado e gerar recompensas
function getND() {
	const ndSelector = document.getElementById('ndSelector');
	const nd = ndSelector.value;

	let riches = getValueFromDict(richesDict, nd); // Busca riquezas
	let equip = getValueFromDict(equipmentDict, nd); // Busca equipamentos

	var elements = document.getElementsByClassName('hidden-initially');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].style.display === 'none') {
			elements[i].style.display = 'block';
		}
	}

	sleep(500).then(() => {
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].style.display === 'block') {
				elements[i].style.display = 'none';
			}
		}
		console.log(`Riquezas: ${riches}`);
		console.log(`Equipamento: ${equip}`);

		// Exibe os resultados na página
		const resultsDiv = document.getElementById('result');
		resultsDiv.innerHTML = ''; // Limpa o conteúdo anterior

		const richesParagraph = document.createElement('p');
		richesParagraph.classList.add('reward');
		richesParagraph.innerText = `Riquezas: ${riches}`; // Exibe as riquezas

		const equipParagraph = document.createElement('p');
		equipParagraph.classList.add('reward');
		equipParagraph.innerText = `Equipamento: ${equip}`; // Exibe o equipamento

		resultsDiv.appendChild(richesParagraph);
		resultsDiv.appendChild(equipParagraph);
	});
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
