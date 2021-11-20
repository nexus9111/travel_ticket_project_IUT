const controller = require("./controller");

let myObj = {
    start: 'gérone',
    end: 'lille',
    type: 'avion',
    seat: '2A',
    gate: '12',
    number: 'EJ23234',
    addtional: 'Les bagages seront automatiquement transférés à votre dernière étape'
}


// UNIT TEST -----------------------------------------------------------------------------------------------------

test('🧪 Object creation: ', () => {
    expect(controller.createObject(myObj).debug)
        .toStrictEqual({
            end: 'lille',
            start: 'gérone',
            seat: '2A',
            gate: '12',
            number: 'EJ23234',
            addtional: 'Les bagages seront automatiquement transférés à votre dernière étape'
        });
})

test('🧪 Object travel getter: ', () => {
    expect(controller.createObject(myObj).travel)
        .toStrictEqual(`🛫 De l'aéroport de gérone, prenez le vol EJ23234 à destination de lille. Porte 12, siège 2A. Les bagages seront automatiquement transférés à votre dernière étape`);
})

test('🧪 Object start place getter: ', () => {
    expect(controller.createObject(myObj).getStart)
        .toStrictEqual("gérone");
})