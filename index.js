#!/usr/bin/env node

const config = require('./assets/travel.json')
const fs = require('fs');
const controller = require('./controller')


// basic variables
allTickets = [];      //list of event


//LOGIQUE -----------------------------------------------------------------------------------------------------

const intiProject = () => {
    config.forEach(jsonObj => {
        allTickets.push(controller.createObject(jsonObj));
    })
};

const printTravel = (obj) => {
    console.log(obj.travel)
} 

const createRoad = (starter) => {
    if (starter === false) {

        for (let i = 0; i < allTickets.length; i++) {
            let hasParent = false;
            for (let j = 0; j < allTickets.length; j++) {
                if (allTickets[j].getEnd.toLowerCase().includes(allTickets[i].getStart.toLowerCase()) 
                || allTickets[i].getStart.toLowerCase().includes(allTickets[j].getEnd.toLowerCase())) {
                    hasParent = true;
                    break;
                } 
            }
            if (!hasParent) {
                printTravel(allTickets[i])
                return createRoad(allTickets[i])
            }
        }
    } else {
        for (let i = 0; i < allTickets.length; i++) {
            for (let j = 0; j < allTickets.length; j++) {
                if (starter.getEnd.toLowerCase().includes(allTickets[i].getStart.toLowerCase()) 
                || allTickets[i].getStart.toLowerCase().includes(starter.getEnd.toLowerCase())) {
                    printTravel(allTickets[i])
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
