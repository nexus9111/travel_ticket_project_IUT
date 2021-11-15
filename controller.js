let infoModel = {     //define structure model
    'start': null,
    'end': null,
    'type': null,
    'seat': null,
    'gate': null,
    'number': null,
    'addtional': null
}

// METHODES -----------------------------------------------------------------------------------------------------

exports.stringToArray = (string, separator) => {
    return string.split(separator);
}

exports.toString = (objectModel) => {
    if (objectModel.type === "train") {
        return `🚃 Prenez le train ${objectModel.number} de ${objectModel.start} à ${objectModel.end}. `
            + (!!objectModel.seat ? `Asseyez-vous à la place ${objectModel.seat}` : "Pas d'attribution de siège")
            + (!!objectModel.addtional ? objectModel.addtional : '');
    } else if (objectModel.type === "bus") {
        return `🚌 Prenez le bus de ${objectModel.start} à ${objectModel.end}. ` 
            + (!!objectModel.seat ? `Asseyez-vous à la place ${objectModel.seat}` : "Pas d'attribution de siège")
            +  (!!objectModel.addtional ? objectModel.addtional : '');
    } else if (objectModel.type === "avion") {
        return `🛫 De l'aéroport de ${objectModel.start}, prenez le vol ${objectModel.number} à destination de ${objectModel.end}. Porte ${objectModel.gate}, `
        +  (!!objectModel.seat ? `siège ${objectModel.seat}. ` : "Pas d'attribution de siège. ")
        +  (!!objectModel.addtional ? objectModel.addtional : '');
    }
}

exports.createObjectFromArray = (arrayToTransform) => {
    try {
        let ticket = Object.assign({}, infoModel);
        ticket.start = arrayToTransform[0] || null;
        ticket.end = arrayToTransform[1] || null;
        ticket.type = arrayToTransform[2] || null;
        ticket.seat = arrayToTransform[3] || null;
        ticket.gate = arrayToTransform[4] || null;
        ticket.number = arrayToTransform[5] || null;
        ticket.addtional = arrayToTransform[6] || null;
        return ticket;
    } catch (err) {
        console.log("❌ invalid ticket format: " + err)
    }  
}