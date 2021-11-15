#!/usr/bin/env node

const config = require('./config.json')
const fs = require('fs');
const controller = require('./controller')


// basic variables
allBrutTickets = [];  //temporary list of event
allTickets = [];      //list of event





//LOGIQUE -----------------------------------------------------------------------------------------------------

const intiProject = () => {
    try {
        const data = fs.readFileSync(config.filePath, 'UTF-8');
        const lines = data.split(/\r?\n/);
        lines.forEach((line) => {
            if (!line.includes("start,end,type,seat,gate,number,addtional") && line.length > 10) {
                allBrutTickets.push(controller.stringToArray(line, ','));
                // allBrutTickets.push(line.split(','));
            }
        });
        allBrutTickets.forEach(function(ticket) {
            allTickets.push(controller.createObjectFromArray(ticket));
        });
        return allTickets;
    } catch (err) {
        console.log("❌ files seems not to exists");
    }
};

const createRoad = (starter) => {
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
                console.log(controller.toString(allTickets[i]))
                return createRoad(allTickets[i])
            }
        }
    } else {
        for (let i = 0; i < allTickets.length; i++) {
            for (let j = 0; j < allTickets.length; j++) {
                if (starter.end.toLowerCase().includes(allTickets[i].start.toLowerCase()) 
                || allTickets[i].start.toLowerCase().includes(starter.end.toLowerCase())) {
                    console.log(controller.toString(allTickets[i]))
                    return createRoad(allTickets[i])
                } 
            }
        }
    }
}

const main = () => {
    console.log("🏴‍☠️ -----Votre voyage avec M&J travel----- 🏴‍☠️")


    intiProject();
    createRoad(false);

    console.log("🏴‍☠️ -----Fin de votre voyage avec M&J travel----- 🏴‍☠️")
}

main();
