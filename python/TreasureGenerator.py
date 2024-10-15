import random

def roll_die(rolls, die):
    return sum(random.randint(1, die) for _ in range(rolls))
        
def item_generator():
    d_hundred = roll_die(1, 100)
    return next((items[chance] for chance in items if d_hundred-1 < chance), None)

def riches_Generator(rolls, die, modifier, multiplicator, value):
    result = f"{(roll_die(rolls, die) + modifier) * multiplicator} {value}"
    return result

def gem_Generator(rolls, die, modifier):
    result = f"{roll_die(rolls,die) + modifier}"
    return f"{result} gema{'s' if int(result) > 1 else ''}"

def art_Generator(rolls, die):
    result = f"{roll_die(rolls,die)}"
    return f"{result} obra{'s' if int(result) > 1 else ''}"

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

riches_dict = {
    "1/3" : {
        "40" : "-",
        "75" : lambda: riches_Generator(1,4,0,10,"¥p"),
        "100" : lambda: riches_Generator(2,6,0,10,"¥p")
    },
    "1/2" : {
        "35" : "-",
        "75" : lambda: riches_Generator(1,6,0,10,"¥p"),
        "100" : lambda: riches_Generator(1,4,0,100,"¥p")
    },
    "1" : {
        "30" : "-",
        "75" : lambda: riches_Generator(1,6,0,100,"¥p"),
        "95" : lambda: riches_Generator(2,4,0,100,"¥p"),
        "100" : lambda: riches_Generator(2,12,0,10,"¥o")
    },
    "2" : {
        "25" : "-",
        "75" : lambda: riches_Generator(1,8,0,100,"¥p"),
        "95" : lambda: riches_Generator(3,6,0,10,"¥o"),
        "100" : lambda: riches_Generator(4,8,0,10,"¥o")
    },
    "3" : {
        "20" : "-",
        "70" : lambda: riches_Generator(1,10,0,10,"¥p"),
        "95" : lambda: riches_Generator(3,8,0,10,"¥o"),
        "100" : lambda: riches_Generator(4,12,0,10,"¥o")
    },
    "4" : {
        "15" : "-",
        "65" : lambda: riches_Generator(3,8,0,100,"¥p"),
        "95" : lambda: riches_Generator(1,6,0,100,"¥o"),
        "100" : lambda: riches_Generator(1,10,0,100,"¥o")
    },
    "5" : {
        "10" : "-",
        "60" : lambda: riches_Generator(3,10,0,10,"¥o"),
        "90" : lambda: riches_Generator(2,4,0,100,"¥o"),
        "100" : lambda: gem_Generator(1, 1, 0)
    },
    "6" : {
        "10" : "-",
        "60" : lambda: riches_Generator(1,4,0,100,"¥o"),
        "90" : lambda: riches_Generator(2,6,0,100,"¥o"),
        "100" : lambda: gem_Generator(1, 1, 0)
    },
    "7" : {
        "10" : "-",
        "60" : lambda: riches_Generator(1,6,0,100,"¥o"),
        "90" : lambda: riches_Generator(3,4,0,100,"¥o"),
        "100" : lambda: gem_Generator(1, 3, 0)
    },
    "8" : {
        "10" : "-",
        "60" : lambda: riches_Generator(1,8,0,100,"¥o"),
        "90" : lambda: riches_Generator(2,8,1,100,"¥o"),
        "100" : lambda: gem_Generator(1, 3, 1)
    },
    "9" : {
        "10" : "-",
        "60" : lambda: riches_Generator(2,4,0,100,"¥o"),
        "90" : lambda: riches_Generator(2,10,1,100,"¥o"),
        "100" : lambda: gem_Generator(1, 4, 1)
    },
    "10" : {
        "10" : "-",
        "60" : lambda: riches_Generator(2,6,0,100,"¥o"),
        "90" : lambda: gem_Generator(1, 3, 2),
        "100" : lambda: art_Generator(1, 1)
    },
    "11" : {
        "15" : "-",
        "85" : lambda: riches_Generator(2,10,0,100,"¥o"),
        "100" : lambda: gem_Generator(2, 4, 0)
    },
    "12" : {
        "15" : "-",
        "85" : lambda: riches_Generator(3,10,0,100,"¥o"),
        "100" : lambda: art_Generator(1,3)
    },
    "13" : {
        "15" : "-",
        "85" : lambda: riches_Generator(4,8,0,100,"¥o"),
        "100" : lambda: gem_Generator(2,6,0)
    },
    "14" : {
        "10" : "-",
        "80" : lambda: riches_Generator(3,12,1,100,"¥o"),
        "100" : lambda: art_Generator(1,4)
    },
    "15" : {
        "10" : "-",
        "80" : lambda: riches_Generator(4,10,0,100,"¥o"),
        "100" : lambda: art_Generator(1,6)
    },
    "16" : {
        "10" : "-",
        "80" : lambda: riches_Generator(4,12,0,100,"¥o"),
        "100" : lambda: art_Generator(2,4)
    },
    "17" : {
        "10" : "-",
        "80" : lambda: riches_Generator(1,6,0,1000,"¥o"),
        "100" : lambda: art_Generator(2,6)
    },
    "18" : {
        "5" : "-",
        "75" : lambda: riches_Generator(1,8,0,1000,"¥o"),
        "100" : lambda: riches_Generator(2,6,0,1000,"¥o")
    },
    "19" : {
        "5" : "-",
        "75" : lambda: riches_Generator(2,4,0,1000,"¥o"),
        "100" : lambda: riches_Generator(3,6,0,1000,"¥o")
    },
    "20" : {
        "5" : "-",
        "75" : lambda: riches_Generator(1,12,1,1000,"¥o"),
        "100" : lambda: riches_Generator(2,10,0,1000,"¥o")
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
    nd = str(nd)
    d_hundred = roll_die(1, 100)
    
    riches = next((riches_dict[nd][cd]() if callable(riches_dict[nd][cd]) else riches_dict[nd][cd]
                for cd in riches_dict[nd] if d_hundred < int(cd)), "")
    
    d_hundred = roll_die(1, 100)
    equip = next((equipment_dict[nd][cd]() if callable(equipment_dict[nd][cd]) else equipment_dict[nd][cd]
                for cd in equipment_dict[nd] if d_hundred < int(cd)), "")
    
    return f"Riquezas: {riches} | Equipamento: {equip}"