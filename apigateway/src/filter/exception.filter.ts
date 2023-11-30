// exception.filter.ts

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(response)
    console.log(exception)
    console.log(status)


    let a = {
      response: {response},
      exception: {exception},
      status: {status}

    }

    response.status(status).json({
      statusCode: status,
      message: exception || 'Internal Server Error',
    });
  }
}
