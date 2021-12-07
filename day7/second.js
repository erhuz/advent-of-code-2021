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
            fuelSum += nthTriangleNumber(position - index) * crabSubmarines[index];
        } else {
            fuelSum += nthTriangleNumber(index - position) * crabSubmarines[index];
        }
    }
    
    return fuelSum;
}

const nthTriangleNumber = (n) => {
    let sum = 0;
    for (let index = 1; index <= n; index++) {
        sum += index;
    }
    return sum;
}

fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(optimizeCrabAlignment(data.split(",")));
})