
const roastList = [
    '#ecosystem',
    '#nature',
    '#environment',
    '#ecology',
    '#climatechange',
    '#biodiversity',
    '#ecofriendly',
    '#earth',
    '#wildlife',
    '#conservation'
];

module.exports = function () {
    return roastList[Math.floor(Math.random() * roastList.length)];
};