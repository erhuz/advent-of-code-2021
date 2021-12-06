const fs = require('fs');

const determineLineCrossings = (input) => {

    const vents = {};

    const addVentAt = (x, y) => {
        const posString = positionToString(x, y);
        if(vents[posString] === undefined){
            vents[posString] = 1;
        } else {
            vents[posString] += 1;
        }
    }

    const lines = {
        diagonal: [],
        horizontal: [],
        vertical: [],
    };
    
    // Parse input
    input.forEach((line) => {
        line = line.split(' -> ');
        line = line.map((dot) => dot.split(',').map(num => parseInt(num)));
        lines[determineLineOrientation(line)].push(line);
    });

    // Horizontals should start with their left most point,
    // and end with their right most point.
    for (let index = 0; index < lines.horizontal.length; index += 1) {
        const line = lines.horizontal[index];
        if(line[0][0] > line[1][0]){
            lines.horizontal[index] = line.reverse();
        }
    }

    // Verticals should start with their top most point,
    // and end with their bottom most point.
    for (let index = 0; index < lines.vertical.length; index += 1) {
        const line = lines.vertical[index];
        if(line[0][1] > line[1][1]){
            lines.vertical[index] = line.reverse();
        }
    }
    
    for (let index = 0; index < lines.horizontal.length; index += 1) {
        const line = lines.horizontal[index];
        for (let cursor = line[0][0]; cursor <= line[1][0]; cursor += 1) {
            // Cursor = moving X
            // On horizontal vector, y is static.
            addVentAt(cursor, line[0][1]);
        }
    }

    for (let index = 0; index < lines.vertical.length; index += 1) {
        const line = lines.vertical[index];
        for (let cursor = line[0][1]; cursor <= line[1][1]; cursor += 1) {
            // Cursor = moving Y
            // On vertical vector, x is static.
            addVentAt(line[0][0], cursor);
        }
    }

    let counter = 0;

    for (const key in vents) {
        if (Object.hasOwnProperty.call(vents, key)) {
            const vent = vents[key];
            if(vent > 1){
                counter += 1;
            }    
        }
    }

    return counter;
}

const determineLineOrientation = (line) => {
    const start = { x: line[0][0], y: line[0][1]};
    const end = { x: line[1][0], y: line[1][1]};

    if(start.x !== end.x && start.y !== end.y) {
        return 'diagonal';
    } else if (start.x !== end.x && start.y === end.y) {
        return 'horizontal';
    } else if (start.x === end.x && start.y !== end.y) {
        return 'vertical';
    }
}

const positionToString = (x, y) => {
    return `${x},${y}`;
}


fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    console.log(determineLineCrossings(data.split("\n")));
})