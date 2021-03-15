/**
 * This functions generates a random number between min(included) and max(included)
 */
module.exports.generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
