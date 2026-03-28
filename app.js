function multiplicationTable(n) {
    if (typeof n !== 'number' || n <= 0) {
        console.log('Помилка: введіть позитивне :) число');
        return;
    }

    for (let multiplier = 1; multiplier <= n; multiplier++) {
        let row = n + ' x ' + multiplier + ' = ' + (n * multiplier);
        console.log(row);
    }
}

function fullTable(from, to) {
    if (typeof from !== 'number' || from <= 0 || typeof to !== 'number' || to <= 0) {
        console.log('Помилка: введіть позитивні :) числа');
        return;
    }

    let headerElement = '';
    for (let fromHeader = from; fromHeader <= to; fromHeader++) {
        headerElement += getSpace(fromHeader) + fromHeader;
    }

    console.log(' ' + headerElement);

    let row = ' ';

    for (let firstMult = from; firstMult <= to; firstMult++) {
        row = '';
        for (let secondMult = from; secondMult <= to; secondMult++) {
            let multResult = firstMult * secondMult;
            row += getSpace(multResult) + multResult;
        }
        console.log(firstMult + row);
    }
}

function getSpace(number) {
    return number >= 10 ? '  ' : '   ';
}

function isPrime(number) {
    if (!isValidInput(number)) return false;

    if (number < 2) return false;

    for (let counter = 2; counter <= Math.sqrt(number); counter++) {
        if (number % counter === 0) {
            return false;
        }
    }
    return true;

}

function primesUpTo(number) {
    if (!isValidInput(number)) return [];

    let primeNumbers = [];

    for (let current = 1; current <= number; current++) {
        if (isPrime(current)) {
            primeNumbers.push(current);
        }
    }

    return primeNumbers;
}


function primeStats(number) {
    if (!isValidInput(number)) return {}

    let stat = {
        count: 0,
        largest: 0,
        sum: 0,
        percentage: 0
    }

    for (let current = 1; current <= number; current++) {
        if (isPrime(current)) {
            stat.largest = current;
            stat.count++;
            stat.sum += current;
        }
    }

    stat.percentage = stat.count / number * 100 + '%';

    return stat;
}

function isValidInput(input) {
    return !(typeof input !== 'number' || input <= 1);
}
