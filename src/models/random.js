"use strict";
// import faker from 'faker'
exports.__esModule = true;
var names = {
    first: [
        'Chris',
        'Anna',
        'Susan',
        'Mike',
        'Shane',
        'Adam',
        'Bianca',
        'Louise'
    ],
    last: [
        'Jackson',
        'Smith',
        'West',
        'Black',
        'Brown',
        'Johnson',
        'Tillerson',
        'Erikson',
        'Swift',
        'Langley',
        'Roberts',
        'Rye',
        'McGregor',
        'Pool'
    ]
};
function random(max) {
    return Math.floor(Math.random() * max);
}
function randomNames(num) {
    var firstIndex, lastIndex;
    return new Array(num).fill(1).map(function () {
        firstIndex = random(names.first.length);
        lastIndex = random(names.last.length);
        return names.first[firstIndex] + ' ' + names.last[lastIndex];
    });
}
exports.randomNames = randomNames;
function createInitial(num, create) {
    if (num === void 0) { num = 10; }
    return randomNames(num).map(function (name) {
        return create(name);
    });
}
exports.createInitial = createInitial;
