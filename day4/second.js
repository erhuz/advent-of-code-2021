const fs = require('fs');

const myFunc = ({numbers, boards}) => {
    const draws = [];
    const irrelevantBoards = [];
    for (let index = 0; index < numbers.length; index++) {
        // Push the current draw to the draws array.
        draws.push(numbers[index]);
        // No one can win before there are 5 numbers drawn.
        if(index < 5) { continue; }

        for (let i = 0; i < boards.length; i++) {
            if(irrelevantBoards.includes(i)){
                continue;
            }

            const board = boards[i];
            const positionsToScan = [];

            for (let index = 0; index < board.length; index++) {
                if(draws.includes(board[index][index])){
                    console.log('HIT!');
                    positionsToScan.push(index);
                }
            }

            if(!positionsToScan.length){ continue; }

            for (const position of positionsToScan) {
                const row = board[position];
                const col = board.map(row => row[position]);

                const rowsCheck = row.every(number => draws.includes(number));
                const colsCheck = col.every(number => draws.includes(number));;

                if (rowsCheck || colsCheck) {

                    // Mark board as irrelevant;
                    if(irrelevantBoards.length < boards.length - 1){
                        irrelevantBoards.push(i);
                        break;
                    }
                    
                    const sum = board.reduce((prev, row) => {
                        const unmarkedNumbers = row.filter(number => !draws.includes(number));
                        return prev + unmarkedNumbers.reduce((prev, number) => prev + number, 0);
                    }, 0)

                    return sum * draws[draws.length - 1];
                }
            }

        }
    }
}

const parseInput = (input) => {
    const boards = [];
    let rows = [];
    let boardIndex = 0;

    for (let index = 2; index < input.length; index++) {
        // new board upcoming.
        if (input[index] === '') {
            boards.push(rows);
            rows = [];
            boardIndex += 1;
            continue;
        }

        const row = input[index];
        let pos = 0;
        const numbers = [];

        while (pos < row.length) {
            numbers.push(parseInt(row.charAt(pos) + row.charAt(pos + 1)));
            pos += 3;
        }
        rows.push(numbers);
    }

    return {
        numbers: input[0].split(',').map(row => parseInt(row)),
        boards,
    }
}

fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    const parsedInput = parseInput(data.split("\n"));
    const result = myFunc(parsedInput);
    console.log(result);
})