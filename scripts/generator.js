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
	let masterpieceLib = [];
	for (let i = 0; i < quantity; i++) {
		const dHundred = rollDie(1, 100); // Rola um d100 para cada item
		for (const cd in richType) {
			if (dHundred <= cd) {
				// Verifica se o valor do d100 corresponde a um item raro
				const masterpiece =
					richType[cd].examples[
						Math.floor(Math.random() * richType[cd].examples.length)
					]; // Escolhe um item aleatório
				masterpieceLib.push(
					`${masterpiece} (Valor: ${richType[cd].price()})`
				); // Adiciona o item à lista
				break;
			}
		}
	}

	// Formata a lista de itens raros
	if (masterpieceLib.length === 1) {
		return `${masterpieceLib[0]}.`; // Retorna o único item
	} else if (masterpieceLib.length === 2) {
		return `${masterpieceLib[0]} e ${masterpieceLib[1]}.`; // Retorna dois itens separados por "e"
	} else if (masterpieceLib.length > 2) {
		const allButLast = masterpieceLib.slice(0, -1).join(', '); // Separa todos os itens, exceto o último, por vírgula
		const lastItem = masterpieceLib[masterpieceLib.length - 1]; // Pega o último item
		return `${allButLast} e ${lastItem}.`; // Retorna a lista formatada
	} else {
		return 'Nenhum item encontrado.'; // Retorna uma mensagem se nenhum item for encontrado
	}
}

// Carregar os dados dos arquivos JSON
let items, gems, arts, richesDict, equipmentDict;

fetch('scripts/dictionaries/items.json')
	.then((response) => response.json())
	.then((data) => (items = data));

fetch('scripts/dictionaries/gems.json')
	.then((response) => response.json())
	.then((data) => {
		gems = data;
		// Transformar strings em funções
		for (const key in gems) {
			if (
				gems[key].price &&
				typeof gems[key].price === 'string' &&
				gems[key].price.startsWith('return')
			) {
				gems[key].price = new Function(gems[key].price);
			}
		}
	});

fetch('scripts/dictionaries/arts.json')
	.then((response) => response.json())
	.then((data) => {
		arts = data;
		// Transformar strings em funções
		for (const key in arts) {
			if (
				arts[key].price &&
				typeof arts[key].price === 'string' &&
				arts[key].price.startsWith('return')
			) {
				arts[key].price = new Function(arts[key].price);
			}
		}
	});

fetch('scripts/dictionaries/riches.json')
	.then((response) => response.json())
	.then((data) => {
		richesDict = data;
		// Transformar strings em funções
		for (const nd in richesDict) {
			for (const cd in richesDict[nd]) {
				if (
					typeof richesDict[nd][cd] === 'string' &&
					richesDict[nd][cd].startsWith('return')
				) {
					richesDict[nd][cd] = new Function(richesDict[nd][cd]);
				}
			}
		}
	});

fetch('scripts/dictionaries/equipment.json')
	.then((response) => response.json())
	.then((data) => {
		equipmentDict = data;
		// Transformar strings em funções
		for (const nd in equipmentDict) {
			for (const cd in equipmentDict[nd]) {
				if (
					typeof equipmentDict[nd][cd] === 'string' &&
					equipmentDict[nd][cd].startsWith('return')
				) {
					equipmentDict[nd][cd] = new Function(equipmentDict[nd][cd]);
				}
			}
		}
	});

// Função para gerar recompensas
function generateReward(nd) {
	let dHundred = rollDie(1, 100); // Rola um d100 para riquezas
	let riches = '';
	for (const cd in richesDict[nd]) {
		if (dHundred <= parseInt(cd)) {
			// Verifica se o valor do d100 corresponde a uma entrada no dicionário
			riches =
				typeof richesDict[nd][cd] === 'function'
					? richesDict[nd][cd]()
					: richesDict[nd][cd]; // Executa a função ou retorna o valor
			break;
		}
	}

	dHundred = rollDie(1, 100); // Rola um d100 para equipamentos
	let equip = '';
	for (const cd in equipmentDict[nd]) {
		if (dHundred <= parseInt(cd)) {
			// Verifica se o valor do d100 corresponde a uma entrada no dicionário
			equip =
				typeof equipmentDict[nd][cd] === 'function'
					? equipmentDict[nd][cd]()
					: equipmentDict[nd][cd]; // Executa a função ou retorna o valor
			break;
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
}

// Função para obter o ND selecionado e gerar recompensas
function getND() {
	const ndSelector = document.getElementById('ndSelector');
	const selectedND = ndSelector.value; // Obtém o valor selecionado no dropdown
	generateReward(selectedND); // Gera as recompensas
}
