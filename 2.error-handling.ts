/**
 * I think we can use the go-lang way of error handling
 * References
 * - https://5error.com/go-style-error-handling-in-javascript/
 */

const successFn = (): Promise<string> => new Promise<string>((resolve, reject) => resolve('It works!'));
const failureFn = (): Promise<string> => new Promise<string>((resolve, reject) => reject(new Error('Oops, i failed!')));

async function safeError(promise: Promise<any>): Promise<[Error, any]> {
    try {
        return [null, await promise];
    } catch (err) {
        return [err, null];
    }
}

(async () => {
    const [err, data] = await safeError(failureFn());
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
})();