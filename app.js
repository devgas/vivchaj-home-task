const students = [
    { name: "Олексій Бойко", age: 20, grade: 85, city: "Київ", courses: ["JS", "React"] },
    { name: "Марія Коваленко", age: 22, grade: 92, city: "Львів", courses: ["JS", "Node.js", "React"] },
    { name: "Іван Петренко", age: 19, grade: 67, city: "Київ", courses: ["HTML", "CSS"] },
    { name: "Анна Шевченко", age: 21, grade: 95, city: "Одеса", courses: ["JS", "TypeScript", "React"] },
    { name: "Дмитро Ткаченко", age: 23, grade: 78, city: "Харків", courses: ["Python", "Django"] },
    { name: "Олена Мельник", age: 20, grade: 88, city: "Київ", courses: ["JS", "React", "Next.js"] },
    { name: "Сергій Бондаренко", age: 24, grade: 55, city: "Львів", courses: ["HTML", "CSS", "JS"] },
    { name: "Юлія Кравченко", age: 21, grade: 91, city: "Дніпро", courses: ["JS", "Vue.js"] },
    { name: "Артем Лисенко", age: 19, grade: 73, city: "Одеса", courses: ["JS", "React"] },
    { name: "Катерина Попова", age: 22, grade: 96, city: "Київ", courses: ["JS", "TypeScript", "React", "Next.js"] },
];

function getTopStudents(students) {
    return students.filter(student => student.grade >= 90).map(student => student.name);
}

function getStudentsByCity(students, city) {
    return students.filter(student => student.city === city).map(student => student.name);
}

function getStudentsByCourse(students, course) {
    return students.filter(student => student.courses.includes(course)).map(student => student.name);
}

function sortByGrade(students) {
    return students.sort((student1, student2) => student2.grade - student1.grade);
}

function sortByName(students) {
    return students.sort((student1, student2) => student1.name.localeCompare(student2.name));
}

function sortByCourseCount(students) {
    return students.sort((student1, student2) => student2.courses.length - student1.courses.length);
}


function getAverageGrade(students) {
    return students.reduce((sumGrade, student) => sumGrade + student.grade, 0) / students.length;
}

function getCityStats(students) {
    return students.reduce((cityStat, student) => {
        cityStat[student.city] = (cityStat[student.city] || 0) + 1;
        return cityStat;
    }, {});
}

function getPopularCourses(students) {
    return students.reduce((courseSum, student) => {
        student.courses.forEach(course => {
            courseSum[course] = (courseSum[course] || 0) + 1;
        });
        return courseSum;
    }, {});
}

function formatStudents(students) {
    return students.map(student => student.name + ' (' + student.city + ')' + ' - ' + student.grade + ' балів');
}

function addStatus(students) {
    return students.map(student => {
        if (student.grade >= 90) {
            student.status = 'excellent';
        } else if (student.grade >= 75) {
            student.status = 'good';
        } else {
            student.status = 'needs-work';
        }
        return student;
    });
}

function topJSStudents(students) {
    return students.filter(student => student.courses
        .filter(course => course === 'JS').length > 0)
        .sort((student1, student2) => student2.grade - student1.grade)
        .slice(0, 3)
        .map((student) => student.name);
}

