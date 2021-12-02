const fs = require('fs');

const CountWithSlidingWindowMeasurements = (values, windowSize) => {
    counter = 0;
    values.reduce((prev, curr, index) => {
        curr = parseInt(curr);

        for (let windowIndex = 1; windowIndex < windowSize; windowIndex++) {
            curr += parseInt(values[index + windowIndex])
        }
        
        if(prev !== null && curr > prev){ counter += 1; }
        return curr;
    }, null)
    return counter;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log('first:  ', CountWithSlidingWindowMeasurements(data.split("\n"), 1));
    console.log('second: ', CountWithSlidingWindowMeasurements(data.split("\n"), 3));
})

