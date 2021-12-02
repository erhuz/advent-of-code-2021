const fs = require('fs');

const calculatePositionFromInstructions = (instructions) => {
    let pos = { x:0, y:0 };
    
    instructions.forEach(instruction => {
        const direction = instruction.split(' ')[0];
        const units = parseInt(instruction.split(' ')[1]);

        switch (direction) {
            case 'up':
                pos.y -= units;
                break;
            case 'down':
                pos.y += units;
                break;
            case 'forward':
                pos.x += units;
                break;
        
            default:
                break;
        }
    });
    return pos.x * pos.y;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    const result = calculatePositionFromInstructions(data.split("\n"));
    console.log(result);
})