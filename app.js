function calculate(a, operator, b) {
    if (operator === '/' && b === 0) return 'Помилка: ділення на нуль';

    if (!['+', '-', '*', '/', '%', '**'].includes(operator)) return 'Помилка: невідомий оператор';

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
        case '**':
            return a ** b;
    }
}

function getSeason(month) {
    const errorText = 'Некоректний місяць. Введіть число від 1 до 12';
    if (typeof month !== 'number' || !Number.isInteger(month)) return errorText;
    if (month < 1 || month > 12) return errorText;
    if ([12, 1, 2].includes(month)) return 'Зима';
    if ([3, 4, 5].includes(month)) return 'Весна';
    if ([6, 7, 8].includes(month)) return 'Літо';
    if ([9, 10, 11].includes(month)) return 'Осінь';
}

function calculateChain(start, ...operations) {
    let result = start;
    operations.forEach(([operator, number]) => {
        result = calculate(result, operator, number);
        if (result.startsWith('Помилка')) return result;
    });

    return result;
}
