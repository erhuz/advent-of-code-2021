const fs = require('fs');

const getGammaRate = (binaryNumbers) => {
    const result = [];

    // Assume all binaries are of the same length.
    for (let index = 0; index < binaryNumbers[0].length; index++) {
        
        const output = binaryNumbers.reduce((prev, curr) => {
            return curr.charAt(index) === '1' ? prev + 1 : prev - 1;
        }, 0)

        const dominantBit = (output > 0) ? '1' : '0';

        result.push(dominantBit);
    }

    return result.join('');
}

const getEpsilonRateFromGammaRate = (gammaRate) => {
    return gammaRate.split('').reduce((prev, curr) => {
        invertedBit = curr === '1' ? '0' : '1';
        return prev + invertedBit;
    }, '')
} 


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    const gammaRate = getGammaRate(data.split("\n"));
    const epsilonRate = getEpsilonRateFromGammaRate(gammaRate);

    console.log('Part 1: ', parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
})