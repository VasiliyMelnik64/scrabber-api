import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from './config';

export class ForbiddenException extends HttpException {
  constructor() {
    super(ERROR_MESSAGES.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}

export class NotFoundException extends HttpException {
  constructor() {
    super(ERROR_MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

export class ServerErrorException extends HttpException {
  constructor() {
    super(
      ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class ApplicationError {
  static getServerError(): ServerErrorException {
    return new ServerErrorException();
  }

  static getForbiddenError(): ForbiddenException {
    return new ForbiddenException();
  }

  static getNotfoundError(): NotFoundException {
    return new NotFoundException();
  }
}
