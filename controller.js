// CLASSES -----------------------------------------------------------------------------------------------------


class travelMethode {
    constructor(start, end, addtional) {
        this.start = start;
        this.end = end;
        this.addtional = addtional || null;
    }

    get debug() {
        return {
            start: this.start || null, 
            end: this.end || null,
            seat: this.seat || null,
            gate: this.gate || null,  
            number: this.number || null,
            addtional: this.addtional || null
        }
    }

    get travel() {
        return this.toStringTravel || "Unknown travel methode"
    }

    get getStart() {
        return this.start;
    }

    get getEnd() {
        return this.end;
    }
}

class Plane extends travelMethode {
    constructor(start, end, seat, gate, number, addtional) {
        super(start, end, addtional);
        this.gate = gate;
        this.number = number;
        this.seat = seat;
        this.toStringTravel = `🛫 De l'aéroport de ${this.start}, prenez le vol ${this.number} à destination de ${this.end}. Porte ${this.gate}, `
            +  (!!this.seat ? `siège ${this.seat}. ` : "Pas d'attribution de siège. ")
            +  (!!this.addtional ? this.addtional : '');
    }
}

class Train extends travelMethode {
    constructor(start, end, seat, gate, number, addtional) {
        super(start, end, addtional);
        this.gate = gate;
        this.number = number;
        this.seat = seat;
        this.toStringTravel = `🚃 Prenez le train ${this.number} de l'${this.start} à l'${this.end}. `
            + (!!this.seat ? `Asseyez-vous à la place ${this.seat}` : "Pas d'attribution de siège")
            + (!!this.addtional ? this.addtional : '');
        }
}

class Bus extends travelMethode {
    constructor(start, end, seat, gate, number, addtional) {
        super(start, end, addtional);
        this.gate = gate;
        this.number = number;
        this.seat = seat;
        this.toStringTravel = `🚌 Prenez le bus de ${this.start} à ${this.end}. ` 
            + (!!this.seat ? `Asseyez-vous à la place ${this.seat}` : "Pas d'attribution de siège")
            + (!!this.addtional ? this.addtional : '');
    }
}

// METHODES -----------------------------------------------------------------------------------------------------

const createObject = (jsonObj) => {
    switch (jsonObj.type) {
        case "avion":
            return new Plane(
                jsonObj.start,
                jsonObj.end,
                jsonObj.seat,
                jsonObj.gate,
                jsonObj.number,
                jsonObj.addtional
            )
        case "bus":
            return new Bus(
                jsonObj.start,
                jsonObj.end,
                jsonObj.seat,
                jsonObj.gate,
                jsonObj.number,
                jsonObj.addtional
            )
        case "train":
            return new Train(
                jsonObj.start,
                jsonObj.end,
                jsonObj.seat,
                jsonObj.gate,
                jsonObj.number,
                jsonObj.addtional
            )
    }
}

// EXPORTS CLASS
module.exports.Plane = Plane;
module.exports.Train = Train;
module.exports.Bus = Bus;

// EXPORT FUNC
module.exports.createObject = createObject;