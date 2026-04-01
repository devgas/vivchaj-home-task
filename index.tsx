// 1. Створення type aliases
type ID = string | number;
type UserStatus = "active" | "inactive" | "banned";

type User = {
    id: ID
    name: string
    email: string
    age: number
    status: UserStatus
}

//2. Типізуй функцію processArray
type Action = "sum" | "average" | "max" | "min";
function processArray(arr: number[], action: Action): number | null {
    if (action === "sum") {
        return arr.reduce((acc, n) => acc + n, 0);
    }
    if (action === "average") {
        return arr.reduce((acc, n) => acc + n, 0) / arr.length;
    }
    if (action === "max") {
        return Math.max(...arr);
    }
    if (action === "min") {
        return Math.min(...arr);
    }
    return null;
}
//3. Типізуй функцію filterByType
function filterByType(
    arr:(string | number | boolean)[],
    typeName: ("string" | "number" | "boolean")
):(string | number | boolean)[] {
    return arr.filter(item => typeof item === typeName);
}
//4. Типізуй функцію calculateStats
type Stats =  {
    count: number
    sum: number
    average: number
    min: number
    max: number
};
function calculateStats(numbers: number[]): Stats {
    if (numbers.length === 0) {
        return { count: 0, sum: 0, average: 0, min: 0, max: 0 };
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return {
        count: numbers.length,
        sum,
        average: sum / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers),
    };
}
//5. Типізуй функцію formatUser
function formatUser(user: User, format: "short" | "medium" | "full"): string {
    if (format === "short") {
        return user.name;
    }
    if (format === "medium") {
        return `${user.name} (${user.email})`;
    }
    if (format === "full") {
        return `${user.name} (${user.email}), вік: ${user.age}, статус: ${user.status}`;
    }
    return user.name;
}
//6. Типізуй функцію parseConfig

type Config = {
    host: string
    port: number
    debug: boolean
};

type PartialConfig = {
    host: string
    port: number
    debug: boolean
}
function parseConfig(raw: Partial<PartialConfig>): Required<Config> {
    const config = {
        host: "localhost",
        port: 3000,
        debug: false,
    };

    if (raw.host) config.host = raw.host;
    if (raw.port) config.port = raw.port;
    if (raw.debug !== undefined) config.debug = raw.debug;

    return config;
}
//7. Типізуй функцію groupBy
function groupBy(arr: User[], key: keyof User): Record<string, User[]> {
    return arr.reduce((groups: Record<string, User[]>, item) => {
        const value = item[key];
        if (!groups[value]) {
            groups[value] = [];
        }
        groups[value].push(item);
        return groups;
    }, {});
}
//8. Типізуй функцію createValidator
type ValidationRule = (value: string) => string | null;
function createValidator(rules: ValidationRule[]): (value: string) => string[] {
    return function validate(value: string) {
        const errors = [];
        for (const rule of rules) {
            const error = rule(value);
            if (error) errors.push(error);
        }
        return errors;
    };
}

type processArray = string[] | number[];
