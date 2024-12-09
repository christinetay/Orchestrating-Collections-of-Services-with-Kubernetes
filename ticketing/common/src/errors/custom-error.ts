export abstract class CustomError extends Error {
    abstract statusCode: Number; 

    constructor(message: string) {
        console.log("custom-error.ts start...");
        super(message);

        (<any>Object).setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError():
    {
        message: string;
        field?: string;
    }[]
}