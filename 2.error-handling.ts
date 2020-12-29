/**
 * References
 * - https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
 * - https://docs.nestjs.com/exception-filters#custom-exceptions
 */

enum HttpStatus {
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500
    // ...etc
}

class HttpException extends Error {

    constructor(private readonly response: string | Record<string, any>,
                private readonly status: number) {
        super();
        if (typeof response === 'string') {
            this.message = response;
        } else if (typeof response === 'object' && 
                   typeof (this.response as Record<string, any>).message === 'string') {
            this.message = (this.response as Record<string, any>).message;
        } else {
            this.message = this.constructor.name;
        }
    }

    public getResponse(): string | object {
        return this.response;
    }
    
    public getStatus(): number {
        return this.status;
    }
}

class BadRequestException extends HttpException {

    constructor(objectOrError?: string | object | any, description: string = 'Forbidden') {
        super((objectOrError && (typeof objectOrError === 'object' && !Array.isArray(objectOrError))) ? objectOrError : { 
                statusCode: HttpStatus.BAD_REQUEST,
                message: objectOrError || description,
                error: objectOrError ? description : undefined,
            }, 
            HttpStatus.BAD_REQUEST);
    }
}

class InternalServerErrorException extends HttpException {

    constructor(objectOrError?: string | object | any, description: string = 'Internal Server Error') {
        super((objectOrError && (typeof objectOrError === 'object' && !Array.isArray(objectOrError))) ? objectOrError : { 
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: objectOrError || description,
                error: objectOrError ? description : undefined,
            }, 
            HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

function validate(param: string): string {
    if (!param) throw new BadRequestException('Invalid request params');
    return param;
 }

validate(null);