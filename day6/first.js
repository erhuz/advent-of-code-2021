const fs = require('fs');

const simulateLanternFishSpawn = (lanternFish, simulationTime) => {
    for (let day = 0; day < simulationTime; day += 1) {

        let fishToSpawn = 0;
        
        for (let index = 0; index < lanternFish.length; index++) {
            if(lanternFish[index] > 0){
                lanternFish[index] -= 1;
            } else {
                fishToSpawn += 1;
                lanternFish[index] = 6;
            }
        }

        for (let index = 0; index < fishToSpawn; index++) {
            lanternFish.push(8);
        }
    }

    return lanternFish.length;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(simulateLanternFishSpawn(data.split(","), 80));
})