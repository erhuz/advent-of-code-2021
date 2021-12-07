const fs = require('fs');

const optimizeCrabAlignment = (crabSubmarines) => {

    // Aggregate crabSubmarines per position.
    crabSubmarines = crabSubmarines.reduce((prev, curr) => {
        curr = parseInt(curr);
        if(prev[curr] !== undefined){
            prev[curr] += 1;
        } else {
            prev[curr] = 1;
        }

        return prev;
    }, [])

    let lowestFuelCost = Infinity;

    for (let index = 0; index < crabSubmarines.length; index++) {
        const fuelSum = calculateFuelCostToAlignAt(index, crabSubmarines);
        if(lowestFuelCost > fuelSum){
            lowestFuelCost = fuelSum;
        }
    }

    return lowestFuelCost;
    
}

const calculateFuelCostToAlignAt = (position, crabSubmarines) => {
    let fuelSum = 0;
    for (let index = 0; index < crabSubmarines.length; index++) {
        if(crabSubmarines[index] === undefined){ continue; }

        if(position > index){
            fuelSum += (position - index) * crabSubmarines[index];
        } else {
            fuelSum += (index - position) * crabSubmarines[index];
        }
    }

    return fuelSum;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(optimizeCrabAlignment(data.split(",")));
})