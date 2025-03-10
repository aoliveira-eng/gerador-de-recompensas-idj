// Função para rolar dados
function rollDie(rolls, die) {
	let sum = 0;
	for (let i = 0; i < rolls; i++) {
		sum += Math.floor(Math.random() * die) + 1; // Gera um número aleatório entre 1 e o valor do dado
	}
	return sum;
}

// Função para gerar um item aleatório
function itemGenerator() {
	const dHundred = rollDie(1, 100); // Rola um d100
	for (const chance in items) {
		if (dHundred - 1 < chance) {
			// Verifica se o valor do d100 corresponde a um item
			return items[chance]; // Retorna o item correspondente
		}
	}
	return null; // Retorna null se nenhum item for encontrado
}

// Função para gerar riquezas
function richesGenerator(rolls, die, modifier, multiplicator, value) {
	const result = (rollDie(rolls, die) + modifier) * multiplicator; // Calcula o valor das riquezas
	return `${result} ${value}`; // Retorna o valor formatado
}

// Função para gerar itens raros
function rareItemGenerator(rolls, die, modifier, richType) {
	let quantity = rollDie(rolls, die) + modifier; // Define a quantidade de itens raros
	let masterpieceLib = new Map(); // Map para armazenar os itens
	let totalValue = 0; // Variável para armazenar o valor total de todas as riquezas

	for (let i = 0; i < quantity; i++) {
		const dHundred = rollDie(1, 100); // Rola um d100 para cada item
		for (const cd in richType) {
			if (dHundred <= cd) {
				// Verifica se o valor do d100 corresponde a um item raro
				const masterpiece =
					richType[cd].examples[
						Math.floor(Math.random() * richType[cd].examples.length)
					];
				const price = richType[cd].price(); // Obtém o preço do item

				// Verifica se a masterpiece já existe no Map
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
		return `${formattedItems[0]} e ${formattedItems[1]}. Total: ${totalValue} ¥o`; // Retorna dois itens separados por "e" com o total
	} else if (formattedItems.length > 2) {
		const allButLast = formattedItems.slice(0, -1).join(', '); // Separa todos os itens, exceto o último, por vírgula
		const lastItem = formattedItems[formattedItems.length - 1]; // Pega o último item
		return `${allButLast} e ${lastItem}. Total: ${totalValue} ¥o`; // Retorna a lista formatada com o total
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

// Função para transformar strings em funções
function transformFunctions(data) {
	for (const key in data) {
		if (
			data[key].price &&
			typeof data[key].price === 'string' &&
			data[key].price.startsWith('return')
		) {
			data[key].price = new Function(data[key].price);
		}
	}
}

// Função para transformar strings em funções em dicionários aninhados
function transformNestedFunctions(data) {
	for (const nd in data) {
		for (const cd in data[nd]) {
			if (
				typeof data[nd][cd] === 'string' &&
				data[nd][cd].startsWith('return')
			) {
				data[nd][cd] = new Function(data[nd][cd]);
			}
		}
	}
}

// Carregar os dados dos arquivos JSON
let items, gems, arts, richesDict, equipmentDict;

Promise.all([
	loadAndTransformJSON('scripts/dictionaries/items.json'),
	loadAndTransformJSON('scripts/dictionaries/gems.json', transformFunctions),
	loadAndTransformJSON('scripts/dictionaries/arts.json', transformFunctions),
	loadAndTransformJSON(
		'scripts/dictionaries/riches.json',
		transformNestedFunctions
	),
	loadAndTransformJSON(
		'scripts/dictionaries/equipment.json',
		transformNestedFunctions
	),
]).then(([itemsData, gemsData, artsData, richesData, equipmentData]) => {
	items = itemsData;
	gems = gemsData;
	arts = artsData;
	richesDict = richesData;
	equipmentDict = equipmentData;
});

// Função para buscar um valor no dicionário com base no resultado do dado
function getValueFromDict(dict, nd) {
	const dHundred = rollDie(1, 100); // Rola um d100
	for (const cd in dict[nd]) {
		if (dHundred <= parseInt(cd)) {
			// Verifica se o valor do d100 corresponde a uma entrada no dicionário
			const value = dict[nd][cd];

			// Se o valor for uma função, executa a função
			if (typeof value === 'function') {
				return value();
			}

			return value;
		}
	}
	return `Valor não encontrado`; // Retorna uma string vazia se nenhum valor for encontrado
}

// Função para gerar recompensas
function generateReward(nd) {
	// Uso da função auxiliar
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

// Função para obter o ND selecionado e gerar recompensas
function getND() {
	const ndSelector = document.getElementById('ndSelector');
	const selectedND = ndSelector.value; // Obtém o valor selecionado no dropdown
	generateReward(selectedND); // Gera as recompensas
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
