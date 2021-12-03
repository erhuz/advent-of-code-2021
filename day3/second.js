const fs = require('fs');

const getRating = (values, preferredBit) => {
    let position = 0;
    let valueList = values;

    while (valueList.length > 1) {

        // Determine which bit is the most common in the current position.
        const dominanceRatio = valueList.reduce((prev, curr) => {
            return curr.charAt(position) === '1' ? prev + 1 : prev - 1;
        }, 0)

        // preferredBit === '1' will return oxygen generator rating.
        // preferredBit === '0' will return CO2 scrubber rating.
        const bitCriteria = preferredBit === '1' ? (
            dominanceRatio >= 0 ? '1' : '0'
        ) : (
            dominanceRatio >= 0 ? '0' : '1'
        );

        // Filter the values.
        valueList = valueList.filter(value => value.charAt(position) === bitCriteria);

        // Keep track of our position & iteration.
        position += 1;
    }

    // Parse string as base 2.
    return parseInt(valueList[0], 2);
}

const getLifeSupportRating = (values) => {
    return getRating(values, '1') * getRating(values, '0');
}

fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if(err) return console.error(err);

    const result = getLifeSupportRating(data.split("\n"));
    console.log(result);
})