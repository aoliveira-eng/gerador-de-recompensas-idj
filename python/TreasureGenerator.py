import random

def roll_die(rolls, die):
    # Returns the sum of all random numbers (rolls) chosen from 1 to the die max (die).
    return sum(random.randint(1, die) for roll in range(rolls))

def item_generator():
    # Returns a random item from the items dict based on the d100.
    d_hundred = roll_die(1, 100)
    return next((items[chance] for chance in items if d_hundred-1 < chance), None)

def riches_generator(rolls, die, modifier, multiplicator, value):
    # Calculates how much money is earned based on ND.
    result = f"{(roll_die(rolls, die) + modifier) * multiplicator} {value}"
    return result

def rare_item_generator(rolls, die, modifier, rich_type):
    # Choose how many rare items are rewarded, based on ND.
    quantity = roll_die(rolls, die) + modifier
    masterpiece_lib = []
    for quantity in range(quantity):
        d_hundred = roll_die(1, 100)
        for cd in rich_type.keys():

            # Compare if the d100 is less than the current cd inside
            # the keys depending of the type of rare item.
            if d_hundred <= cd:

                # Choose a random item from the examples array inside
                # given cd and appends the result to a list.
                masterpiece = random.choice(rich_type[cd]["examples"])
                masterpiece_lib.append(f"{masterpiece} (Valor: {rich_type[cd]['price']()})")
                break

    # Format the string to return to the user.
    if len(masterpiece_lib) > 1:
        return f", ".join(masterpiece_lib[:-1]) + f", e {masterpiece_lib[-1]}."
    else:
        return masterpiece_lib[0] + "."

items = {
    1: "Algemas",
    2: "Amuleto de jade",
    12: "Bálsamo restaurador",
    16: "Bomba de fumaça",
    21: "Corda",
    26: "Corda de seda",
    28: "Espelho",
    33: "Furoshiki",
    38: "Futon",
    40: "Instrumento musical",
    42: "Kit de artesão",
    44: "Kit de disfarces",
    46: "Kit de ladrão",
    48: "Kit de medicamentos",
    53: "Lanterna",
    58: "Mochila",
    63: "Papel",
    65: "Pé de cabra",
    70: "Pederneira",
    72: "Pedra de tinta",
    74: "Pincel",
    79: "Ração de viagem",
    89: "Tocha",
    94: "Tokkuri",
    96: "Vara de madeira",
    100: "Vela"
}

gems = {
    25: {
        "price": lambda: str(roll_die(4,4)) + " ¥o",
        "average": "10 ¥o",
        "examples": [
            "Ágata Listrada", "Ágata Ciclope", "Ágata Musgo", "Quartzo azul", "Hematita",
            "Lápis-lazúli", "Malaquita", "Obsidiana", "Rodocrosita",
            "Olho de tigre", "Pérola (irregular)", "Agua-marinha"
        ]
    },
    50: {
        "price": lambda: str(roll_die(2,4) * 10) + " ¥o",
        "average": "50 ¥o",
        "examples": [
            "Heliotropo (Pedra Sangue)", "Cornalina", "Citrino", "Iolita",
            "Jaspe", "Adulária", "Ônix", "Perídoto", 
            "Cristal de Rocha (Quartzo Hialino)", "Quartzo Rosa", "Zircão"
        ]
    },
    70: {
        "price": lambda: str(roll_die(4,4) * 10) + " ¥o",
        "average": "100 ¥o",
        "examples": [
            "Âmbar", "Ametista", "Coral", "Piropo",
            "Grossularite", "Lignito", "Pérola branca", "Pérola dourada", 
            "Pérola rosa", "Pérola prateada", "Espinela vermelha", "Turmalina"
        ]
    },
    90: {
        "price": lambda: str(roll_die(2,4) * 100) + " ¥o",
        "average": "500 ¥o",
        "examples": [
            "Alexandrita", "Água-marinha", "Espinela violeta",
            "Pérola negra", "Espinela azul escuro", "Topázio amarelo"
        ]
    },
    99: {
        "price": lambda: str(roll_die(4,4) * 100) + " ¥o",
        "average": "1.000 ¥o",
        "examples": [
            "Jade", "Esmeralda", "Opala branca", "Opala negra", "Opala vermelha",
            "Safira azul", "Coríndon amarelo", "Coríndon púrpura", 
            "Safira-estrela azul", "Safira-estrela negra", "Rubi estrela"
        ]
    },
    100: {
        "price": lambda: str(roll_die(2,4) * 1000) + " ¥o",
        "average": "5.000 ¥o",
        "examples": [
            "Jade celestial", "Esmeralda verde-claro", 
            "Diamante branco-azulado", "Diamante canário", "Diamante rosa",
            "Diamante marrom", "Diamante azul", "Zircão vermelho", "Zircão transparente"
        ]
    }
}

arts = {
    10: {
        "price": lambda: str(roll_die(1,10) * 10) + " ¥o",
        "average": "55 ¥o",
        "examples": [
            "Vaso de cerâmica esmaltado em cor simples", 
            "Estatueta de marfim entalhado", 
            "Pequeno bracelete de ouro finamente trabalhado"
        ]
    },
    25: {
        "price": lambda: str(roll_die(3,6) * 10) + " ¥o",
        "average": "105 ¥o",
        "examples": [
            "Vestimentas de seda", 
            "Pente de prata com muitos citrinos", 
            "Lanterna de seda em forma de pagode", 
            "Vaso de calcedônia decorado com crisântemos"
        ]
    },
    40: {
        "price": lambda: str(roll_die(1,6) * 100) + " ¥o",
        "average": "350 ¥o",
        "examples": [
            "Pintura grande e colorida em papel de seda", 
            "Karakuri de madeira com ornamentos de lápis-lazúli", 
            "Candelabro de prata com flores de lótus esculpidas"
        ]
    },
    50: {
        "price": lambda: str(roll_die(1,10) * 100) + " ¥o",
        "average": "550 ¥o",
        "examples": [
            "Conjunto de estatuetas de marfim de três vanaras em meditação", 
            "Tanto cerimonial ornada em ouro com pérola dourada na ponta do cabo"
        ]
    },
    60: {
        "price": lambda: str(roll_die(2,6) * 100) + " ¥o",
        "average": "700 ¥o",
        "examples": [
            "Biwa de madeira exótica decorado com turmalinas", 
            "Conjunto de chá em cerâmica decorado com fios de ouro"
        ]
    },
    70: {
        "price": lambda: str(roll_die(3,6) * 100) + " ¥o",
        "average": "1.050 ¥o",
        "examples": [
            "Vaso de coral esmaltado com pinturas delicadas", 
            "Ídolo de prata maciça com olhos de âmbar"
        ]
    },
    80: {
        "price": lambda: str(roll_die(4,6) * 100) + " ¥o",
        "average": "1.400 ¥o",
        "examples": [
            "Colar de oração com contas de ágata", 
            "Conjunto de pratos de cerâmica pintados e decorados em ouro"
        ]
    },
    85: {
        "price": lambda: str(roll_die(5,6) * 100) + " ¥o",
        "average": "1.750 ¥o",
        "examples": [
            "Altar de madeira exótica com decorações de flor de lótus", 
            "Prato de jade em forma de crisântemo"
        ]
    },
    90: {
        "price": lambda: str(roll_die(1,4) * 1000) + " ¥o",
        "average": "2.500 ¥o",
        "examples": [
            "Katana ornamental em forma de dragão celestial", 
            "Gongo de bronze folheado a ouro", 
            "Espelho de prata com cabo esculpido em jade"
        ]
    },
    95: {
        "price": lambda: str(roll_die(1,6) * 1000) + " ¥o",
        "average": "3.500 ¥o",
        "examples": [
            "Estatueta de falcão em bronze em um galho natural envernizado", 
            "Tiara ornada com águas-marinhas"
        ]
    },
    99: {
        "price": lambda: str(roll_die(2,4) * 1000) + " ¥o",
        "average": "5.000 ¥o",
        "examples": [
            "Estatueta de jade de um dragão celestial", 
            "Daisho ornamental esmaltado em negro decorado com pérolas negras"
        ]
    },
    100: {
        "price": lambda: str(roll_die(2,6) * 1000) + " ¥o",
        "average": "7.000 ¥o",
        "examples": [
            "Jogo de chá em cerâmica esmaltada decorado com esmeraldas", 
            "Anel de ouro com jade celestial"
        ]
    }
}

riches_dict = {
    "1/3" : {
        "40" : "-",
        "75" : lambda: riches_generator(1,4,0,10,"¥p"),
        "100" : lambda: riches_generator(2,6,0,10,"¥p")
    },
    "1/2" : {
        "35" : "-",
        "75" : lambda: riches_generator(1,6,0,10,"¥p"),
        "100" : lambda: riches_generator(1,4,0,100,"¥p")
    },
    "1" : {
        "30" : "-",
        "75" : lambda: riches_generator(1,6,0,100,"¥p"),
        "95" : lambda: riches_generator(2,4,0,100,"¥p"),
        "100" : lambda: riches_generator(2,12,0,10,"¥o")
    },
    "2" : {
        "25" : "-",
        "75" : lambda: riches_generator(1,8,0,100,"¥p"),
        "95" : lambda: riches_generator(3,6,0,10,"¥o"),
        "100" : lambda: riches_generator(4,8,0,10,"¥o")
    },
    "3" : {
        "20" : "-",
        "70" : lambda: riches_generator(1,10,0,10,"¥p"),
        "95" : lambda: riches_generator(3,8,0,10,"¥o"),
        "100" : lambda: riches_generator(4,12,0,10,"¥o")
    },
    "4" : {
        "15" : "-",
        "65" : lambda: riches_generator(3,8,0,100,"¥p"),
        "95" : lambda: riches_generator(1,6,0,100,"¥o"),
        "100" : lambda: riches_generator(1,10,0,100,"¥o")
    },
    "5" : {
        "10" : "-",
        "60" : lambda: riches_generator(3,10,0,10,"¥o"),
        "90" : lambda: riches_generator(2,4,0,100,"¥o"),
        "100" : lambda: rare_item_generator(1, 1, 0, gems)
    },
    "6" : {
        "10" : "-",
        "60" : lambda: riches_generator(1,4,0,100,"¥o"),
        "90" : lambda: riches_generator(2,6,0,100,"¥o"),
        "100" : lambda: rare_item_generator(1, 1, 0, gems)
    },
    "7" : {
        "10" : "-",
        "60" : lambda: riches_generator(1,6,0,100,"¥o"),
        "90" : lambda: riches_generator(3,4,0,100,"¥o"),
        "100" : lambda: rare_item_generator(1, 3, 0, gems)
    },
    "8" : {
        "10" : "-",
        "60" : lambda: riches_generator(1,8,0,100,"¥o"),
        "90" : lambda: riches_generator(2,8,1,100,"¥o"),
        "100" : lambda: rare_item_generator(1, 3, 1, gems)
    },
    "9" : {
        "10" : "-",
        "60" : lambda: riches_generator(2,4,0,100,"¥o"),
        "90" : lambda: riches_generator(2,10,1,100,"¥o"),
        "100" : lambda: rare_item_generator(1, 4, 1, gems)
    },
    "10" : {
        "10" : "-",
        "60" : lambda: riches_generator(2,6,0,100,"¥o"),
        "90" : lambda: rare_item_generator(1, 3, 2, gems),
        "100" : lambda: rare_item_generator(1, 1, 0, arts)
    },
    "11" : {
        "15" : "-",
        "85" : lambda: riches_generator(2,10,0,100,"¥o"),
        "100" : lambda: rare_item_generator(2, 4, 0, gems)
    },
    "12" : {
        "15" : "-",
        "85" : lambda: riches_generator(3,10,0,100,"¥o"),
        "100" : lambda: rare_item_generator(1,3, 0, arts)
    },
    "13" : {
        "15" : "-",
        "85" : lambda: riches_generator(4,8,0,100,"¥o"),
        "100" : lambda: rare_item_generator(2,6,0, gems)
    },
    "14" : {
        "10" : "-",
        "80" : lambda: riches_generator(3,12,1,100,"¥o"),
        "100" : lambda: rare_item_generator(1,4, 0, arts)
    },
    "15" : {
        "10" : "-",
        "80" : lambda: riches_generator(4,10,0,100,"¥o"),
        "100" : lambda: rare_item_generator(1,6, 0, arts)
    },
    "16" : {
        "10" : "-",
        "80" : lambda: riches_generator(4,12,0,100,"¥o"),
        "100" : lambda: rare_item_generator(2,4, 0, arts)
    },
    "17" : {
        "10" : "-",
        "80" : lambda: riches_generator(1,6,0,1000,"¥o"),
        "100" : lambda: rare_item_generator(2,6, 0, arts)
    },
    "18" : {
        "5" : "-",
        "75" : lambda: riches_generator(1,8,0,1000,"¥o"),
        "100" : lambda: riches_generator(2,6,0,1000,"¥o")
    },
    "19" : {
        "5" : "-",
        "75" : lambda: riches_generator(2,4,0,1000,"¥o"),
        "100" : lambda: riches_generator(3,6,0,1000,"¥o")
    },
    "20" : {
        "5" : "-",
        "75" : lambda: riches_generator(1,12,1,1000,"¥o"),
        "100" : lambda: riches_generator(2,10,0,1000,"¥o")
    }
}

equipment_dict = {
    "1/3": {
        "60": "-",
        "75": item_generator,
        "100": "Arma"
    },
    "1/2": {
        "55": "-",
        "75": item_generator,
        "100": "Arma"
    },
    "1": {
        "50": "-",
        "75": item_generator,
        "95": "Arma",
        "100": "Armadura"
    },
    "2": {
        "45": "-",
        "70": item_generator,
        "95": "Arma",
        "100": "Armadura"
    },
    "3": {
        "40": "-",
        "65": item_generator,
        "90": "Arma",
        "100": "Armadura"
    },
    "4": {
        "30": "-",
        "70": "Arma",
        "95": "Armadura",
        "100": "Arma obra-prima"
    },
    "5": {
        "25": "-",
        "60": "Armadura",
        "90": "Arma obra-prima",
        "100": "Armadura obra-prima"
    },
    "6": {
        "25": "-",
        "65": "Arma obra-prima",
        "90": "Armadura obra-prima",
        "100": "Arma de material especial"
    },
    "7": {
        "25": "-",
        "65": "Armadura obra-prima",
        "90": "Arma de material especial",
        "100": "Armadura de material especial"
    },
    "8": {
        "25": "-",
        "70": "Arma de material especial",
        "90": "Armadura de material especial",
        "100": "Item mágico menor"
    },
    "9": {
        "25": "-",
        "65": "Arma de material especial",
        "85": "Armadura de material especial",
        "100": "Item mágico menor"
    },
    "10": {
        "25": "-",
        "55": "Arma de material especial",
        "80": "Armadura de material especial",
        "100": "Item mágico menor"
    },
    "11": {
        "50": "-",
        "90": "Item mágico menor",
        "100": "Item mágico médio"
    },
    "12": {
        "50": "-",
        "85": "Item mágico menor",
        "100": "Item mágico médio"
    },
    "13": {
        "50": "-",
        "80": "Item mágico menor",
        "100": "Item mágico médio"
    },
    "14": {
        "50": "-",
        "95": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "15": {
        "45": "-",
        "95": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "16": {
        "45": "-",
        "90": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "17": {
        "45": "-",
        "85": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "18": {
        "45": "-",
        "80": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "19": {
        "45": "-",
        "75": "Item mágico médio",
        "100": "Item mágico maior"
    },
    "20": {
        "40": "-",
        "70": "Item mágico médio",
        "100": "Item mágico maior"
    }
}

def call_generators(nd):
    # ND is received as "int", so we need to convert it.
    nd = str(nd)
    d_hundred = roll_die(1, 100)

    # Checks if the d_hundred is less than the current cd from a for loop, and if true uses the data inside
    # to calculate the rest of the prizes. If there is a callable function on the position of that nd and cd
    # it will excecute the lambda function to generate random results each time, allowing repetition.
    riches = next((riches_dict[nd][cd]() if callable(riches_dict[nd][cd]) else riches_dict[nd][cd]
                   for cd in riches_dict[nd] if d_hundred < int(cd)), "")
    
    d_hundred = roll_die(1, 100)
    
    # Same principle as the var 'riches' above, only for equipment.
    equip = next((equipment_dict[nd][cd]() if callable(equipment_dict[nd][cd]) else equipment_dict[nd][cd]
                for cd in equipment_dict[nd] if d_hundred < int(cd)), "")
    
    return f"Riquezas: {riches} | Equipamento: {equip}"