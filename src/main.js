/**
 * @ngdoc overview
 * @name main
 *
 * @description
 * I'm the overview of documentation, I'm in docs/main.js file
 *
 * Click on "cat" or "dog" module in navbar
 */

var dog = require('./dog');
var cat = require('./cat');

module.exports = {
    dog: dog,
    cat: cat
};