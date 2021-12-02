const fs = require('fs');

const countIncrements = (values) => {
    let counter = 0;
    values.reduce((prev, curr) => {
        if(prev !== null && parseInt(curr) > prev){ counter += 1; }
        return parseInt(curr);
    }, null)
    return counter;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(countIncrements(data.split("\n")));
})