#!/usr/bin/env node

const config = require('./config.json')
const fs = require('fs');

// basic variables
let infoModel = {     //define structure model
    'start': null,
    'end': null,
    'type': null,
    'seat': null,
    'gate': null,
    'number': null,
    'addtional': null
}
allBrutTickets = [];  //temporary list of event
allTickets = [];      //list of event


// METHODES -----------------------------------------------------------------------------------------------------

exports.stringToArray = (string, separator) => {
    return string.split(separator);
}

exports.toString = (objectModel) => {
    if (objectModel.type === "train") {
        return `🚃 Prenez le train ${objectModel.number} de ${objectModel.start} à ${objectModel.end}. `
            + (!!objectModel.start ? `Asseyez-vous à la place ${objectModel.start}` : "Pas d'attribution de siège")
            + objectModel.addtional;
    } else if (objectModel.type === "bus") {
        return `🚌 Prenez le bus de ${objectModel.start} à ${objectModel.end}. ` 
            + (!!objectModel.start ? `Asseyez-vous à la place ${objectModel.start}` : "Pas d'attribution de siège")
            + objectModel.addtional
    } else if (objectModel.type === "avion") {
        return `🛫 De l'aéroport de ${objectModel.start}, renez le vol ${objectModel.number} à destination de ${objectModel.end}. Porte ${objectModel.gate}, siège ${objectModel.seat}. ` + objectModel.addtional;
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


//LOGIQUE -----------------------------------------------------------------------------------------------------

intiProject = () => {
    try {
        const data = fs.readFileSync(config.filePath, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            if (!line.includes("start,end,type,seat,gate,number,addtional") && line.length > 10) {
                allBrutTickets.push(exports.stringToArray(line, ','));
                // allBrutTickets.push(line.split(','));
            }
        });
        allBrutTickets.forEach(function(ticket) {
            allTickets.push(exports.createObjectFromArray(ticket));
        });
        return allTickets;
    } catch (err) {
        console.log("❌ files seems not to exists");
    }
};

createRoad = (starter) => {
    if (starter === false) {
        for (let i = 0; i < allTickets.length; i++) {
            let hasParent = false;
            for (let j = 0; j < allTickets.length; j++) {
                if (allTickets[j].end.toLowerCase().includes(allTickets[i].start.toLowerCase()) 
                || allTickets[i].start.toLowerCase().includes(allTickets[j].end.toLowerCase())) {
                    hasParent = true;
                    break;
                } 
            }
            if (!hasParent) {
                console.log(exports.toString(allTickets[i]))
                return createRoad(allTickets[i])
            }
        }
    } else {
        for (let i = 0; i < allTickets.length; i++) {
            for (let j = 0; j < allTickets.length; j++) {
                if (starter.end.toLowerCase().includes(allTickets[i].start.toLowerCase()) 
                || allTickets[i].start.toLowerCase().includes(starter.end.toLowerCase())) {
                    console.log(exports.toString(allTickets[i]))
                    return createRoad(allTickets[i])
                } 
            }
        }
    }
}

main = () => {
    console.log("🏴‍☠️ -----Votre voyage avec M&J travel----- 🏴‍☠️")


    intiProject();
    createRoad(false);

    console.log("🏴‍☠️ -----Fin de votre voyage avec M&J travel----- 🏴‍☠️")
}

main();
