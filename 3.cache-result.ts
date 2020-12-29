const cache = (fn: Function): Function => {
    let cache: Record<number, number> = {};
    return (param: number): number => {
        if (param in cache) {
            console.log('Retrieving data from cache');
            return cache[param];
        } else {
            console.log('Retrieving data from function');
            cache[param] = fn(param);
            return cache[param];
        }
    };
}

const hundredTimes = cache((param: number): number => 100 * param);

console.log(hundredTimes(1));
console.log(hundredTimes(1));
console.log(hundredTimes(2));
console.log(hundredTimes(2));
console.log(hundredTimes(1));