//1. var → let/const
const name = "Олексій";
const age = 25;
const items = [1, 2, 3];
for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
}

//2. Конкатенація → Template literals
const greeting = `Привіт, ${name} ! Тобі ${age} років.`;
const title = 'Тест блок';
const description = 'Це опис тестового блоку.';
let html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
        <p>${greeting}</p>
    </div>
`;

//3. function → Arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) =>  n * 2);
const even = numbers.filter((n) =>  n % 2 === 0);
const sumOfNumbers = numbers.reduce((acc, n) => acc + n, 0);

setTimeout(() => {
    console.log("Готово!");
}, 1000);


//4. Object properties → Shorthand + destructuring
createUser = (...inputs) => {
    return {...inputs};
}

displayUser = (...user) => {
    let [name, age, email] = user;
    console.log(`${name}, ${age}, ${email}`);
}

const arr = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arr;

//5. Default parameters + rest/spread
greet = (name = "гість") => {
    console.log(`Привіт, ${name}!`);
}

mergeObjects = (target, source) => {
    return {...target, ...source};
}

sum = (...args) => {
    return args.reduce((a, b) =>  a + b, 0);
}

//6. Optional chaining + nullish coalescing
getUserCity = (user) => {
    return user?.address?.city ?? "Невідомо";
}

getConfig = (options) => {
    return options?.timeout ?? 5000;
}

//Бонус: Повний рефакторинг
processStudents = (students = [], minGrade = 70) => {
    let result = [];
    for (const student of students) {
        if (student.grade >= minGrade) {
            result = [...result, {
                name: student.name,
                grade: student.grade,
                city: student?.address?.city ?? "Невідомо",
                status: student.grade >= 90 ? "відмінник" : "хорошист"
            }];
        }
    }

    return result.sort((a, b) => b.grade - a.grade);
}
