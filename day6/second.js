const fs = require('fs');

const simulateLanternFishSpawn = (lanternFish, simulationTime) => {

    // Aggregate fish per time to birth.
    let fish = lanternFish.split(',').reduce((prev, daysUntilBirth) => {
        if(prev[daysUntilBirth] !== undefined){
            prev[daysUntilBirth] += 1;
        } else {
            prev[daysUntilBirth] = 1;
        }

        return prev;
    }, [])

    for (let day = 0; day < simulationTime; day++) {
        // We use the array index as a "daysToBirth" key.
        fish = fish.reduce((prev, curr, index) => {

            if(index < 1){
                prev[8] += curr;
                prev[6] += curr;
            } else {
                prev[index - 1] += curr;
            }

            return prev;
        }, [0,0,0,0,0,0,0,0,0])
    }

    return fish.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(simulateLanternFishSpawn(data, 256));
})