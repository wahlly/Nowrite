import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      message: exception.message,
      statusCode: status,
      data: {
            timestamp: new Date().toISOString(),
            path: request.url,
      }
    });
  }
}


export class SERVER_ERROR_Exception extends HttpException {
      constructor(message: string) {
            super(message, HttpStatus.NOT_ACCEPTABLE)
      }
}