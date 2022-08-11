import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
    constructor(message: string) {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: [
                message
            ],
            error: 'Bad Request',
        }, HttpStatus.BAD_REQUEST);
    }
}