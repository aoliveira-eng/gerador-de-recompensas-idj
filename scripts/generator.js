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

// Dicionário de itens comuns
const items = {
	1: 'Algemas',
	2: 'Amuleto de jade',
	12: 'Bálsamo restaurador',
	16: 'Bomba de fumaça',
	21: 'Corda',
	26: 'Corda de seda',
	28: 'Espelho',
	33: 'Furoshiki',
	38: 'Futon',
	40: 'Instrumento musical',
	42: 'Kit de artesão',
	44: 'Kit de disfarces',
	46: 'Kit de ladrão',
	48: 'Kit de medicamentos',
	53: 'Lanterna',
	58: 'Mochila',
	63: 'Papel',
	65: 'Pé de cabra',
	70: 'Pederneira',
	72: 'Pedra de tinta',
	74: 'Pincel',
	79: 'Ração de viagem',
	89: 'Tocha',
	94: 'Tokkuri',
	96: 'Vara de madeira',
	100: 'Vela',
};

// Dicionário de gemas
const gems = {
	25: {
		price: () => `${rollDie(4, 4)} ¥o`,
		examples: [
			'Ágata Listrada',
			'Ágata Ciclope',
			'Ágata Musgo',
			'Quartzo azul',
			'Hematita',
			'Lápis-lazúli',
			'Malaquita',
			'Obsidiana',
			'Rodocrosita',
			'Olho de tigre',
			'Pérola (irregular)',
			'Agua-marinha',
		],
	},
	50: {
		price: () => `${rollDie(2, 4) * 10} ¥o`,
		examples: [
			'Heliotropo (Pedra Sangue)',
			'Cornalina',
			'Citrino',
			'Iolita',
			'Jaspe',
			'Adulária',
			'Ônix',
			'Perídoto',
			'Cristal de Rocha (Quartzo Hialino)',
			'Quartzo Rosa',
			'Zircão',
		],
	},
	70: {
		price: () => `${rollDie(4, 4) * 10} ¥o`,
		examples: [
			'Âmbar',
			'Ametista',
			'Coral',
			'Piropo',
			'Grossularite',
			'Lignito',
			'Pérola branca',
			'Pérola dourada',
			'Pérola rosa',
			'Pérola prateada',
			'Espinela vermelha',
			'Turmalina',
		],
	},
	90: {
		price: () => `${rollDie(2, 4) * 100} ¥o`,
		examples: [
			'Alexandrita',
			'Água-marinha',
			'Espinela violeta',
			'Pérola negra',
			'Espinela azul escuro',
			'Topázio amarelo',
		],
	},
	99: {
		price: () => `${rollDie(4, 4) * 100} ¥o`,
		examples: [
			'Jade',
			'Esmeralda',
			'Opala branca',
			'Opala negra',
			'Opala vermelha',
			'Safira azul',
			'Coríndon amarelo',
			'Coríndon púrpura',
			'Safira-estrela azul',
			'Safira-estrela negra',
			'Rubi estrela',
		],
	},
	100: {
		price: () => `${rollDie(2, 4) * 1000} ¥o`,
		examples: [
			'Jade celestial',
			'Esmeralda verde-claro',
			'Diamante branco-azulado',
			'Diamante canário',
			'Diamante rosa',
			'Diamante marrom',
			'Diamante azul',
			'Zircão vermelho',
			'Zircão transparente',
		],
	},
};

// Dicionário de obras de arte
const arts = {
	10: {
		price: () => `${rollDie(1, 10) * 10} ¥o`,
		examples: [
			'Vaso de cerâmica esmaltado em cor simples',
			'Estatueta de marfim entalhado',
			'Pequeno bracelete de ouro finamente trabalhado',
		],
	},
	25: {
		price: () => `${rollDie(3, 6) * 10} ¥o`,
		examples: [
			'Vestimentas de seda',
			'Pente de prata com muitos citrinos',
			'Lanterna de seda em forma de pagode',
			'Vaso de calcedônia decorado com crisântemos',
		],
	},
	40: {
		price: () => `${rollDie(1, 6) * 100} ¥o`,
		examples: [
			'Pintura grande e colorida em papel de seda',
			'Karakuri de madeira com ornamentos de lápis-lazúli',
			'Candelabro de prata com flores de lótus esculpidas',
		],
	},
	50: {
		price: () => `${rollDie(1, 10) * 100} ¥o`,
		examples: [
			'Conjunto de estatuetas de marfim de três vanaras em meditação',
			'Tanto cerimonial ornada em ouro com pérola dourada na ponta do cabo',
		],
	},
	60: {
		price: () => `${rollDie(2, 6) * 100} ¥o`,
		examples: [
			'Biwa de madeira exótica decorado com turmalinas',
			'Conjunto de chá em cerâmica decorado com fios de ouro',
		],
	},
	70: {
		price: () => `${rollDie(3, 6) * 100} ¥o`,
		examples: [
			'Vaso de coral esmaltado com pinturas delicadas',
			'Ídolo de prata maciça com olhos de âmbar',
		],
	},
	80: {
		price: () => `${rollDie(4, 6) * 100} ¥o`,
		examples: [
			'Colar de oração com contas de ágata',
			'Conjunto de pratos de cerâmica pintados e decorados em ouro',
		],
	},
	85: {
		price: () => `${rollDie(5, 6) * 100} ¥o`,
		examples: [
			'Altar de madeira exótica com decorações de flor de lótus',
			'Prato de jade em forma de crisântemo',
		],
	},
	90: {
		price: () => `${rollDie(1, 4) * 1000} ¥o`,
		examples: [
			'Katana ornamental em forma de dragão celestial',
			'Gongo de bronze folheado a ouro',
			'Espelho de prata com cabo esculpido em jade',
		],
	},
	95: {
		price: () => `${rollDie(1, 6) * 1000} ¥o`,
		examples: [
			'Estatueta de falcão em bronze em um galho natural envernizado',
			'Tiara ornada com águas-marinhas',
		],
	},
	99: {
		price: () => `${rollDie(2, 4) * 1000} ¥o`,
		examples: [
			'Estatueta de jade de um dragão celestial',
			'Daisho ornamental esmaltado em negro decorado com pérolas negras',
		],
	},
	100: {
		price: () => `${rollDie(2, 6) * 1000} ¥o`,
		examples: [
			'Jogo de chá em cerâmica esmaltada decorado com esmeraldas',
			'Anel de ouro com jade celestial',
		],
	},
};

// Dicionário de riquezas por ND
const richesDict = {
	'1/3': {
		40: '-',
		75: () => richesGenerator(1, 4, 0, 10, '¥p'),
		100: () => richesGenerator(2, 6, 0, 10, '¥p'),
	},
	'1/2': {
		35: '-',
		75: () => richesGenerator(1, 6, 0, 10, '¥p'),
		100: () => richesGenerator(1, 4, 0, 100, '¥p'),
	},
	1: {
		30: '-',
		75: () => richesGenerator(1, 6, 0, 100, '¥p'),
		95: () => richesGenerator(2, 4, 0, 100, '¥p'),
		100: () => richesGenerator(2, 12, 0, 10, '¥o'),
	},
	2: {
		25: '-',
		75: () => richesGenerator(1, 8, 0, 100, '¥p'),
		95: () => richesGenerator(3, 6, 0, 10, '¥o'),
		100: () => richesGenerator(4, 8, 0, 10, '¥o'),
	},
	3: {
		20: '-',
		70: () => richesGenerator(1, 10, 0, 10, '¥p'),
		95: () => richesGenerator(3, 8, 0, 10, '¥o'),
		100: () => richesGenerator(4, 12, 0, 10, '¥o'),
	},
	4: {
		15: '-',
		65: () => richesGenerator(3, 8, 0, 100, '¥p'),
		95: () => richesGenerator(1, 6, 0, 100, '¥o'),
		100: () => richesGenerator(1, 10, 0, 100, '¥o'),
	},
	5: {
		10: '-',
		60: () => richesGenerator(3, 10, 0, 10, '¥o'),
		90: () => richesGenerator(2, 4, 0, 100, '¥o'),
		100: () => rareItemGenerator(1, 1, 0, gems),
	},
	6: {
		10: '-',
		60: () => richesGenerator(1, 4, 0, 100, '¥o'),
		90: () => richesGenerator(2, 6, 0, 100, '¥o'),
		100: () => rareItemGenerator(1, 1, 0, gems),
	},
	7: {
		10: '-',
		60: () => richesGenerator(1, 6, 0, 100, '¥o'),
		90: () => richesGenerator(3, 4, 0, 100, '¥o'),
		100: () => rareItemGenerator(1, 3, 0, gems),
	},
	8: {
		10: '-',
		60: () => richesGenerator(1, 8, 0, 100, '¥o'),
		90: () => richesGenerator(2, 8, 1, 100, '¥o'),
		100: () => rareItemGenerator(1, 3, 1, gems),
	},
	9: {
		10: '-',
		60: () => richesGenerator(2, 4, 0, 100, '¥o'),
		90: () => richesGenerator(2, 10, 1, 100, '¥o'),
		100: () => rareItemGenerator(1, 4, 1, gems),
	},
	10: {
		10: '-',
		60: () => richesGenerator(2, 6, 0, 100, '¥o'),
		90: () => rareItemGenerator(1, 3, 2, gems),
		100: () => rareItemGenerator(1, 1, 0, arts),
	},
	11: {
		15: '-',
		85: () => richesGenerator(2, 10, 0, 100, '¥o'),
		100: () => rareItemGenerator(2, 4, 0, gems),
	},
	12: {
		15: '-',
		85: () => richesGenerator(3, 10, 0, 100, '¥o'),
		100: () => rareItemGenerator(1, 3, 0, arts),
	},
	13: {
		15: '-',
		85: () => richesGenerator(4, 8, 0, 100, '¥o'),
		100: () => rareItemGenerator(2, 6, 0, gems),
	},
	14: {
		10: '-',
		80: () => richesGenerator(3, 12, 1, 100, '¥o'),
		100: () => rareItemGenerator(1, 4, 0, arts),
	},
	15: {
		10: '-',
		80: () => richesGenerator(4, 10, 0, 100, '¥o'),
		100: () => rareItemGenerator(1, 6, 0, arts),
	},
	16: {
		10: '-',
		80: () => richesGenerator(4, 12, 0, 100, '¥o'),
		100: () => rareItemGenerator(2, 4, 0, arts),
	},
	17: {
		10: '-',
		80: () => richesGenerator(1, 6, 0, 1000, '¥o'),
		100: () => rareItemGenerator(2, 6, 0, arts),
	},
	18: {
		5: '-',
		75: () => richesGenerator(1, 8, 0, 1000, '¥o'),
		100: () => richesGenerator(2, 6, 0, 1000, '¥o'),
	},
	19: {
		5: '-',
		75: () => richesGenerator(2, 4, 0, 1000, '¥o'),
		100: () => richesGenerator(3, 6, 0, 1000, '¥o'),
	},
	20: {
		5: '-',
		75: () => richesGenerator(1, 12, 1, 1000, '¥o'),
		100: () => richesGenerator(2, 10, 0, 1000, '¥o'),
	},
};

// Dicionário de equipamentos por ND
const equipmentDict = {
	'1/3': { 60: '-', 75: itemGenerator, 100: 'Arma' },
	'1/2': { 55: '-', 75: itemGenerator, 100: 'Arma' },
	1: { 50: '-', 75: itemGenerator, 95: 'Arma', 100: 'Armadura' },
	2: { 45: '-', 70: itemGenerator, 95: 'Arma', 100: 'Armadura' },
	3: { 40: '-', 65: itemGenerator, 90: 'Arma', 100: 'Armadura' },
	4: { 30: '-', 70: 'Arma', 95: 'Armadura', 100: 'Arma obra-prima' },
	5: {
		25: '-',
		60: 'Armadura',
		90: 'Arma obra-prima',
		100: 'Armadura obra-prima',
	},
	6: {
		25: '-',
		65: 'Arma obra-prima',
		90: 'Armadura obra-prima',
		100: 'Arma de material especial',
	},
	7: {
		25: '-',
		65: 'Armadura obra-prima',
		90: 'Arma de material especial',
		100: 'Armadura de material especial',
	},
	8: {
		25: '-',
		70: 'Arma de material especial',
		90: 'Armadura de material especial',
		100: 'Item mágico menor',
	},
	9: {
		25: '-',
		65: 'Arma de material especial',
		85: 'Armadura de material especial',
		100: 'Item mágico menor',
	},
	10: {
		25: '-',
		55: 'Arma de material especial',
		80: 'Armadura de material especial',
		100: 'Item mágico menor',
	},
	11: { 50: '-', 90: 'Item mágico menor', 100: 'Item mágico médio' },
	12: { 50: '-', 85: 'Item mágico menor', 100: 'Item mágico médio' },
	13: { 50: '-', 80: 'Item mágico menor', 100: 'Item mágico médio' },
	14: { 50: '-', 95: 'Item mágico médio', 100: 'Item mágico maior' },
	15: { 45: '-', 95: 'Item mágico médio', 100: 'Item mágico maior' },
	16: { 45: '-', 90: 'Item mágico médio', 100: 'Item mágico maior' },
	17: { 45: '-', 85: 'Item mágico médio', 100: 'Item mágico maior' },
	18: { 45: '-', 80: 'Item mágico médio', 100: 'Item mágico maior' },
	19: { 45: '-', 75: 'Item mágico médio', 100: 'Item mágico maior' },
	20: { 40: '-', 70: 'Item mágico médio', 100: 'Item mágico maior' },
};

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
