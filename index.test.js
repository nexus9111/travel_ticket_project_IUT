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
let myString = "gérone,lille,avion,2A,12,EJ23234,Les bagages seront automatiquement transférés à votre dernière étape,"


// UNIT TEST -----------------------------------------------------------------------------------------------------

test('String converted to array', () => {
    expect(typeof controller.stringToArray(myString, ','))
        .toBe('object');
})

test('String transformed to desired output', () => {
    expect(controller.stringToArray(myString, ','))
        .toStrictEqual(['gérone','lille','avion','2A','12','EJ23234','Les bagages seront automatiquement transférés à votre dernière étape','']);
})


test('toSring return string', () => {
    expect(typeof controller.toString(myObj))
        .toBe('string')
})

test('toSring return desired output', () => {
    expect(controller.toString(myObj))
        .toStrictEqual("🛫 De l'aéroport de gérone, renez le vol EJ23234 à destination de lille. Porte 12, siège 2A. Les bagages seront automatiquement transférés à votre dernière étape")
})


test('createObjectFromArray return desired object', () => {
    expect(controller.createObjectFromArray(['gérone','lille','avion','2A','12','EJ23234','Les bagages seront automatiquement transférés à votre dernière étape','']))
        .toStrictEqual({     //define structure model
            'start': 'gérone',
            'end': 'lille',
            'type': 'avion',
            'seat': '2A',
            'gate': '12',
            'number': 'EJ23234',
            'addtional': 'Les bagages seront automatiquement transférés à votre dernière étape'
        })
})