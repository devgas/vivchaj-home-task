class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.validation();
    }

    validation() {
        if (this.name.length < 2) {
            throw Error ('Імя повинно містити мінімум 2 символи');
        }

        if (!this.email.includes('@')) {
            throw Error ('Email повинен містить символ @');
        }

        if (this.age < 16 || this.age > 120) {
            throw Error ('Вік має бути більше 16 і менше 120');
        }
    }

    info () {
        return `${this.name} (${this.email}), вік: ${this.age}`;
    }

    greet() {
        return `Привіт, я ${this.name}!`;
    }

    isAdult() {
        return this.age >= 18;
    }

    static fromObject({ name, email, age }) {
        return new User(name, email, age);
    }
}

class Admin extends User {
    constructor(name, email, age, permissions = []) {
        super(name, email, age);
        this.permissions = permissions;
    }

    hasPermission(perm) {
        return this.permissions.includes(perm);
    }

    addPermission(perm) {
        this.permissions = [this.permissions, ...perm];
    }

    removePermission(perm) {
        this.hasPermission(perm) && (this.permissions = this.permissions.filter(p => p !== perm));
    }

    info() {
        return `${this.name} (${this.email}), вік: ${this.age} [ADMIN]`;
    }
}

class ModeratorUser extends User {
    constructor(name, email, age, moderatedSections = []) {
        super(name, email, age);
        this.moderatedSections = moderatedSections;
    }

    canModerate(section) {
        return this.moderatedSections.includes(section);
    }

    info() {
        return `${this.name} (${this.email}), вік: ${this.age} [MOD]`;
    }
}

class UserManager {
    #users = [];
    #onUserAddedCallbacks = [];

    on(event, callback) {
        if (event === 'userAdded') this.#onUserAddedCallbacks.push(callback);
    }

    addUser(user) {
        this.#users = [...this.#users, user];
        this.#onUserAddedCallbacks.forEach(cb => cb(user));
    }

    removeUser(email) {
        const user = this.findByEmail(email);
        this.#users = this.#users.filter(u => u.email !== email);
    }

    findByEmail(email) {
        return this.#users.find(u => u.email === email);
    }

    getAdmins() {
        return this.#users.filter(u => u instanceof Admin);
    }

    getAllInfo() {
        return this.#users.map(u => u.info());
    }

    count() {
        return this.#users.length;
    }

    sortByAge() {
        return [...this.#users].sort((a, b) => a.age - b.age);
    }

    toJSON() {
        return JSON.stringify(this.#users);
    }
}

const userManager = new UserManager();
localStorage.setItem('users', userManager.toJSON());
const fromLocalStorage = JSON.parse(localStorage.getItem('users'));
